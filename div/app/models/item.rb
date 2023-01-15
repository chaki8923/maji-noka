class Item < BaseModel
  attr_accessor :name, :price, :description, :file1, :file2, :file3, :file4

  def create(params)
    ## TODO：あとで消す
    # Rails.logger.debug "APIに渡すparams---------------------------------#{params}"
    res = execute_api('item/create', params, method: 'post')
  end

  def update(params)
    res = execute_api('item/update', params, method: 'post')
  end

  def index
    res = execute_api('item/index', method: 'get')
  end


end