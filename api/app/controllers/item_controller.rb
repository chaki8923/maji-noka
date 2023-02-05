
class ItemController < ApplicationController
  after_action :set_csrf_token_header

  def create
    data = Item.new(item_params)
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if data.class == Array
      render json: data[1]
    else
      res = data.create(data)
    end
  end

  def index
    res = Item.index
    ## TODO：あとで消す
    Rails.logger.debug "all_item---------------------------------#{res}"

    render json: res
  end

  def update
      data = AdminQuery.new
      res = data.get_admin_user(item_params[:email])
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
  params.permit(:name, 
                :price, 
                :description, 
                :postage, 
                :inventory, 
                :maji_flag, 
                :images
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
end