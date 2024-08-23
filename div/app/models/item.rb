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
                :category_id,
                :action,
                :image1,
                :image2,
                :iamge3,
                :image4

  def create(params)
    res = execute_api('item/create', params, method: 'post')
    convert_boolean(res)
  end

  def update(params)
    ## TODO:Chakiあとで消す
    Rails.logger.debug "params---------------------------------#{params}"
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

  private
  def item_params
    images = []
    (1..4).each do |num|
      images.push("@image#{num}")
    end

    images.push(@images)
    {
      name: @name,
      price: @price,
      description: @description,
      postage: @postage,
      inventory: @inventory,
      maji_flag: @maji_flag,
      action: @action,
      category_id: @category_id,
      images: images
      }
  end
end
