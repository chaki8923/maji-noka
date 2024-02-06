
class ItemsController < ApplicationController
  Dotenv.load
  ACCESS_KEY = ENV["ACCESS_KEY_ID"]
  SECRET_KEY = ENV["SECRET_ACCESS_KEY"]
  REGION = "ap-northeast-1"
  BUCKET = "maji-image"
  after_action :set_csrf_token_header

  def create
    data = Item.new(item_params)
    ## TODO:あとで消す
    Rails.logger.debug "item_params---------------------------------#{item_params}"
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if data.class == Array
      render json: data[1]
    else
      res = data.create(data)
      render json: res[0]
    end
  end

  def index
    res = Item.index
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)  
    signer = Aws::S3::Presigner.new(client: s3resource.client)
    res.map do |d|
      d[:image] = item_first_image(signer, d)
    end
    # render json: res
    render json: res
  end

  def edit
    res = Item.find(params["id"])
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)  
    signer = Aws::S3::Presigner.new(client: s3resource.client)
    res[:image] = item_get_images(signer, res) if res[:images].present?
    render json: res
  end
  
  
  def update
    data = Item.new(item_params)
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if data.class == Array
      render json: data[1]
    else
      res = data.update(data)
      render json: res[0]
    end
  end

  def delete
      data = AdminQuery.new
      res = data.get_admin_user(params["email"])
      render json: res
  end

  private
  def item_params
    #  params.permit(:name, :price, :description,  file: [:file_name, :ctype])
    params.permit(
      :id, 
      :name, 
      :price, 
      :description, 
      :postage, 
      :inventory, 
      :maji_flag, 
      :images,
      :action
    )
  end

  def get_s3_resource(access_key, secret_key, region)
    s3resource = Aws::S3::Resource.new(
      access_key_id: access_key,
      secret_access_key: secret_key,
      region: region,
    )
    s3resource
  end

  def item_first_image(signer, item)
    file_name = "item_image_#{item[:id]}_0"
    signer
      .presigned_url(
        :get_object,
        bucket: BUCKET, 
        key: "item/#{item[:id]}/#{file_name}", 
        expires_in: 60
      )
  end

  def item_get_images(signer, items)
    image_hash = []
    JSON.parse(items[:images]).each_with_index do |image, idx|
    url = 
      signer
        .presigned_url(
          :get_object,
          bucket: BUCKET, 
          key: "item/#{items[:id]}/item_image_#{items[:id]}_#{idx}", 
          expires_in: 60
        )
    image_hash.push(url)
    end
    image_hash
  end
end