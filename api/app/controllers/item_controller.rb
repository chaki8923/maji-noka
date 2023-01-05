class ItemController < ApplicationController
  after_action :set_csrf_token_header

  def create
    file = eval(item_params["file"])
    data = Item.new(item_params)
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if data.class == Array
      render json: data[1]
    else
      res = data.create(data)
    end
  end

  

  def index
    auth = Auth.new
    res = auth.check(item_params)
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if res.class == Array
      render json: res[1]
    else
      return true
    end
  end


  def update
      data = AdminQuery.new
      res = data.get_admin_user(item_params[:email])
      ## TODO：あとで消す
      Rails.logger.debug "get_admin_user結果---------------------------------#{res.class}"
      render json: res
  end

  def delete
      data = AdminQuery.new
      res = data.get_admin_user(params["email"])
      ## TODO：あとで消す
      Rails.logger.debug "get_admin_user結果---------------------------------#{res.class}"
      render json: res
  end

  private
  def item_params
  #  params.permit(:name, :price, :description,  file: [:file_name, :ctype])
  params.permit(:name, :price, :description, :file)
  end
end