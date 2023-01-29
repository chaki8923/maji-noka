
class ItemController < ApplicationController
  after_action :set_csrf_token_header

  def create
    Rails.logger.debug "item_paramsだ---------------------------------#{item_params}"
    Rails.logger.debug "params[images]だ---------------------------------#{params["images"]}"
    Rails.logger.debug "params[price]だ---------------------------------#{params["price"].class}"
    data = Item.new(item_params)
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if data.class == Array
      render json: data[1]
    else
      res = data.create(data)
    end
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
  params.permit(:name, :price, :description, :images, images: [])
  end
end