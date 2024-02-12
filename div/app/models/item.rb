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
    make_data(res)
  end

  def update(params)
    res = execute_api('item/update', params, method: 'post')
    make_data(res)
  end

  def index
    res = execute_api('item/index', method: 'get')
    make_list(res)
  end

  def edit(params)
    ## TODO：あとで消す
    Rails.logger.debug "edit_res---------------------------------#{params}"
    res = execute_api('item/edit', params, method: 'get')
    make_data(res)
  end

  def update(params) # rubocop:disable Lint/DuplicateMethods
    execute_api('item/update', params, method: 'post')
  end
end
