require "aws-sdk"
require "dotenv"
Dotenv.load
ACCESS_KEY = ENV["ACCESS_KEY_ID"]
SECRET_KEY = ENV["SECRET_ACCESS_KEY"]
REGION = "ap-northeast-1"
BUCKET = "maji-image"


class ItemController < ApplicationController
  after_action :set_csrf_token_header

  def create
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    data = Item.new(item_params)
    file_path = Rails.root.join("public", data.file.value)
    s3_key = "item/"
    file = eval(item_params["file"])
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if data.class == Array
      render json: data[1]
    else
      # 問題なければイメージアップロード
      image_upload(file)
      # s3へアップロード
      s3_upload(s3resource, s3_key, file_path)
      # ローカルのデータは消す
      image_delete(file_path)
      res = data.create(data)
    end
  end

  def image_upload(file)
    Rails.logger.info "ローカルのpublic配下に画像保存---------------------------------"
    output_path = Rails.root.join("public", file["file_name"])
    File.open(output_path, 'wb'){ |f| f.write(file["read"]) }
  end
  
  def s3_upload(s3resource, key, file_path)
    Rails.logger.info "S3に#{file_path}を保存---------------------------------"
    s3resource.bucket(BUCKET).object(key).upload_file(file_path)
  end
  
  def image_delete(file_name)
    Rails.logger.info "ローカルの#{file_name}を削除---------------------------------"
    File.delete(file_name)
  end
  

  def index
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    image = s3resource.bucket("maji-image").object("images/1").get.body
    data = ItemQuery.new
    res = data.get_all
    ## TODO：あとで消す
    Rails.logger.debug "all_item---------------------------------#{res}"
    Rails.logger.debug "s3のデータ---------------------------------#{image}"

    render json: res
  end

  def get_s3_resource(access_key, secret_key, region)
    s3resource = Aws::S3::Resource.new(
      access_key_id: access_key,
      secret_access_key: secret_key,
      region: region,
    )
    s3resource
  end


  def update
      data = AdminQuery.new
      res = data.get_admin_user(item_params[:email])
      ## TODO：あとで消す
      Rails.logger.debug "#{controller_name}::get_admin_user結果---------------------------------#{res.class}"
      render json: res
  end

  def delete
      data = AdminQuery.new
      res = data.get_admin_user(params["email"])
      ## TODO：あとで消す
      Rails.logger.debug "#{controller_name}::get_admin_user結果---------------------------------#{res.class}"
      render json: res
  end

  private
  def item_params
  #  params.permit(:name, :price, :description,  file: [:file_name, :ctype])
  params.permit(:name, :price, :description, :file)
  end
end