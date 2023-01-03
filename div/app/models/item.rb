class Item < BaseModel
  attr_accessor :name, :price, :description, :file

  def create(params)
    ## TODO：あとで消す
    # Rails.logger.debug "APIに渡すparams---------------------------------#{params}"
    res = execute_api('item/create', params, method: 'post')
  end

  def update(params)
    res = execute_api('item/update', params, method: 'post')
  end

  def index(params)
    res = execute_api('item/index', params, method: 'get')
  end


end