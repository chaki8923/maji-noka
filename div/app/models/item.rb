# frozen_string_literal: true

class Item < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :id,
                :name,
                :price,
                :description,
                :images,
                :postage,
                :inventory,
                :maji_flag,
                :action

  def create(params)
    res = execute_api('item/create', params, method: 'post')
    convert_boolean(res)
  end

  def update(params)
    res = execute_api('item/update', params, method: 'post')
    convert_boolean(res)
  end

  def index
    res = execute_api('item/index', method: 'get')
    make_list(res)
  end

  def edit(params)
    res = execute_api('item/edit', params, method: 'get')
    make_data(res)
  end

  def delete # rubocop:disable Lint/DuplicateMethods
    execute_api('item/delete', {id: @id}, method: 'post')
  end
end
