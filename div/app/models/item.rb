class Item < BaseModel
  attr_accessor :id, 
  :name, 
  :price, 
  :description, 
  :images, 
  :postage, 
  :inventory, 
  :maji_flag

  def create(params)
    res = execute_api('item/create', params, method: 'post')
  end

  def update(params)
    res = execute_api('item/update', params, method: 'post')
  end

  def index
    res = execute_api('item/index', method: 'get')
  end

  def edit(params)
    res = execute_api('item/edit', params, method: 'get')
  end

  def update(params)
    res = execute_api('item/update', params, method: 'post')
  end
end