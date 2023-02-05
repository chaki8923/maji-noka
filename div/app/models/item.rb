class Item < BaseModel
  attr_accessor :name, :price, :description, :images, :postage, :inventory, :maji_flag

  def create(params)
    ## TODO：あとで消す
    Rails.logger.debug "APIに渡すparams---------------------------------#{params["price"].class}"
    res = execute_api('item/create', params, method: 'post')
  end

  def update(params)
    res = execute_api('item/update', params, method: 'post')
  end

  def index
    res = execute_api('item/index', method: 'get')
  end
end