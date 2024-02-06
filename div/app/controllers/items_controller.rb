require 'base64'
Dotenv.load
ACCESS_KEY = ENV["ACCESS_KEY_ID"]
SECRET_KEY = ENV["SECRET_ACCESS_KEY"]
REGION = "ap-northeast-1"
BUCKET = "maji-image"
class ItemsController < ApplicationController
  def new
    @data = Item.new
    @prm = {
      :file_name => nil,
      :ctype => nil,
      }
  end

  def create
    @data = Item.new(item_params)    
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)  
    send_params = item_params
    send_params["images"] = convert_image_params(send_params["images"]).to_json
    send_params["maji_flag"] = send_params["maji_flag"].to_i == 1 ? true:false
    res = @data.create(send_params.to_unsafe_h)
    ## TODO:あとで消す
    if res.key?("id")
      item_params.merge!("id" => res["id"])
      Rails.logger.debug "item_params---------------------------------#{item_params}"
       # 問題なければイメージアップロード
      item_images_upload([item_params], s3resource, res["id"])
      redirect_to index_path, notice: "商品が登録されました"
    else
      render action: 'new'
    end
  end

  def index
    data = Item.new
    @items = data.index
  end

  def edit
    @data = Item.new
    @item = get_item(params.permit(:id))
    ## TODO：あとで消す
    Rails.logger.debug "@item---------------------------------#{@item}"
  end
  
  def update
    @data = Item.new(item_params)
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)  
    send_params = item_params
    send_params["images"] = convert_image_params(send_params["images"]).to_json
    send_params["maji_flag"] = send_params["maji_flag"].to_i == 1 ? true:false
    send_params["images"] = send_params["images"]
    res = @data.update(send_params.to_unsafe_h)
    if res.key?("id")
      ## TODO:あとで消す
    Rails.logger.debug "update_res---------------------------------#{res}"
      item_images_upload([item_params], s3resource, item_params["id"])
      redirect_to index_path, notice: "商品が編集されました"
    else
      @item = get_item(item_params)
      ## TODO：あとで消す
      render action: 'edit'
    end
  end

  def image_upload(file, file_name)
    output_path = Rails.root.join("public/images", file_name)
    File.open(output_path, 'wb'){ |f| f.write(file.read) }
  end
  
  def s3_upload(s3resource, key, file_path)
    s3resource.bucket(BUCKET).object(key).upload_file(file_path)
  end

  def s3_delete(s3resource, key, file_path)
    # TODO:勘で書いたのでテスト必要
    Rails.logger.info "S3の#{file_path}を削除---------------------------------"
    s3resource.bucket(BUCKET).object(key).delete(file_path)
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
      :action,
      images: []
    )
    
   end

   def convert_image_params(image_params)
    return if image_params.nil?
    image_params = image_params.map do |img|
      img = {:name => img.original_filename, :size => img.size}
    end
    image_params
   end

   def get_s3_resource(access_key, secret_key, region)
    s3resource = Aws::S3::Resource.new(
      access_key_id: access_key,
      secret_access_key: secret_key,
      region: region,
    )
    s3resource
  end

  def item_images_upload(item_prams, s3resource, item_id)
    return if item_params["images"].nil?
    # 問題なければイメージアップロード
    item_params["images"].each_with_index do |image, idx|
      file_name = "item_image_#{item_id}_#{idx}"
      file_path = Rails.root.join("public/images", file_name)
      image_upload(image, file_name)
      # 画像圧縮
      compress_image("public/images/#{file_name}")
      # s3へアップロード
      s3_key = "item/#{item_id}/#{file_name}"
      s3_upload(s3resource, s3_key, file_path)
      # ローカルのデータは消す
      image_delete(file_path)
    end
    rescue => e
      raise e
  end

  def get_item(id)
    data = Item.new
    @item = JSON.parse(data.edit(id))
    return @item
  end

end