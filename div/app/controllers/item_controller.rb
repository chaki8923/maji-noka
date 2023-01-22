require 'base64'
require "aws-sdk"
require "dotenv"
Dotenv.load
ACCESS_KEY = ENV["ACCESS_KEY_ID"]
SECRET_KEY = ENV["SECRET_ACCESS_KEY"]
REGION = "ap-northeast-1"
BUCKET = "maji-image"
class ItemController < ApplicationController
  def new
    ## TODO：あとで消す
    Rails.logger.debug "item_new---------------------------------#{}"
    @data = Item.new
    @prm = {
      :file_name => nil,
      :ctype => nil,
      }
  end

  def create
    @data = Item.new(item_params)
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    s3_key = "item/"
    Rails.logger.debug "item_params---------------------------------#{item_params}"
    
    params["item"]["images"] = params["item"]["images"].map do |prm|
      prm = {:name => prm.original_filename}
        
    end
    Rails.logger.debug "最初params[images]---------------------------------#{params["item"]["images"]}"
    params["item"]["images"] = params["item"]["images"].to_json
    Rails.logger.debug "Jsonあとparams[images]---------------------------------#{params["item"]["images"]}"
    res = @data.create(params["item"].to_unsafe_h)
    if res == true
       # 問題なければイメージアップロード
       item_params["images"].each do |item|
        file_path = Rails.root.join("public", item.original_filename)
        image_upload(item)
        # s3へアップロード
        s3_upload(s3resource, s3_key, file_path)
        # ローカルのデータは消す
        image_delete(file_path)

       end
      redirect_to index_path
    else
      render action: 'new'
    end
  end

  def image_upload(file)
    Rails.logger.info "ローカルのpublic配下に画像保存---------------------------------"
    output_path = Rails.root.join("public", file.original_filename)
    File.open(output_path, 'wb'){ |f| f.write(file.read) }
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
    data = Item.new
    items = data.index
  end

  private
   def item_params
    # params.require(:item).permit(:name, :price, :description, :image1, :image2, :image3, :image4)
    params.require(:item).permit(:name, :price, :description ,images: [])
    
   end

   def get_s3_resource(access_key, secret_key, region)
    s3resource = Aws::S3::Resource.new(
      access_key_id: access_key,
      secret_access_key: secret_key,
      region: region,
    )
    s3resource
  end

end