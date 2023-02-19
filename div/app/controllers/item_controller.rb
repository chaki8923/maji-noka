require 'base64'
require "aws-sdk"
require "dotenv"
require 'mini_magick'
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
    ## TODO：あとで消す
    Rails.logger.debug "item_params---------------------------------#{item_params["maji_flag"]}"
    
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)  
    send_params = item_params
    if send_params["images"].present?
      send_params["images"] = send_params["images"].map do |prm|
        prm = {:name => prm.original_filename, :size => prm.size}
      end
    end

    send_params["maji_flag"] = send_params["maji_flag"].to_i == 1 ? true:false
    send_params["images"] = send_params["images"].to_json
    res = @data.create(send_params.to_unsafe_h)

    if res == true
       # 問題なければイメージアップロード
      item_params["images"].each_with_index do |item, idx|
        file_path = Rails.root.join("public/images", item.original_filename)
        image_upload(item)
        # 画像圧縮
        compress_image("public/images/#{item.original_filename}")
        # s3へアップロード
        s3_key = "item/#{item.original_filename}"
        s3_upload(s3resource, s3_key, file_path)
        # ローカルのデータは消す
        image_delete(file_path)
      end
      redirect_to index_path, notice: "商品が登録されました"
    else
      render action: 'new'
    end
  end

  def index
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)  
    @signer = Aws::S3::Presigner.new(client: s3resource.client)
    data = Item.new
    @items = data.index
    @items
  end


  def edit
    @data = Item.new
    @item = get_item(params.permit(:id))
  end

  def update
    @data = Item.new(item_params)
    @item = get_item(item_params)
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)  
    send_params = item_params
    if send_params["images"].present?
      send_params["images"] = send_params["images"].map do |prm|
        prm = {:name => prm.original_filename, :size => prm.size}
      end
    end

    send_params["maji_flag"] = send_params["maji_flag"].to_i == 1 ? true:false
    send_params["images"] = send_params["images"].to_json
    res = @data.update(send_params.to_unsafe_h)

    if res == true
       # 問題なければイメージアップロード
      item_params["images"].each_with_index do |item, idx|
        file_path = Rails.root.join("public/images", item.original_filename)
        image_upload(item)
        # 画像圧縮
        compress_image("public/images/#{item.original_filename}")
        # s3へアップロード
        s3_key = "item/#{item.original_filename}"
        s3_upload(s3resource, s3_key, file_path)
        # ローカルのデータは消す
        image_delete(file_path)
      end
      redirect_to index_path, notice: "商品が登録されました"
    else
      render action: 'edit'
    end
  end

  def image_upload(file)
    Rails.logger.info "ローカルのpublic配下に画像保存---------------------------------"
    output_path = Rails.root.join("public/images", file.original_filename)
    File.open(output_path, 'wb'){ |f| f.write(file.read) }
  end
  
  def s3_upload(s3resource, key, file_path)
    Rails.logger.info "S3に#{file_path}を保存---------------------------------"
    s3resource.bucket(BUCKET).object(key).upload_file(file_path)
  end

  def s3_delete(s3resource, key, file_path)
    # TODO:勘で書いたのでテスト必要
    Rails.logger.info "S3の#{file_path}を削除---------------------------------"
    s3resource.bucket(BUCKET).object(key).delete(file_path)
  end
  
  def get_s3_images(signer, items)
    image_arr = []
    items.each do |it|
      image_arr.push(signer.presigned_url(:get_object,
        bucket: BUCKET, 
        key: "item/#{change_json(it["images"])[0]["name"]}", 
        expires_in: 60))
      ## TODO：あとで消す
    end
    
    image_arr
  end

  def compress_image(file_path)
    image = MiniMagick::Image.open(file_path)
    image.resize "40%"
    image.write file_path
  end
  
  def image_delete(file_name)
    Rails.logger.info "ローカルの#{file_name}を削除---------------------------------"
    File.delete(file_name)
  end
  


  private
   def item_params
    params.require(:item).permit(
      :id,
      :name, 
      :price, 
      :description, 
      :postage, 
      :inventory, 
      :maji_flag, 
      images: [])
    
   end

   def get_s3_resource(access_key, secret_key, region)
    s3resource = Aws::S3::Resource.new(
      access_key_id: access_key,
      secret_access_key: secret_key,
      region: region,
    )
    s3resource
  end

  def get_item(id)
    data = Item.new
    @item = JSON.parse(data.edit(id))
    return @item
  end

end