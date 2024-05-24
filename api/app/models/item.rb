# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Item # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :name, :price, :images, :description, :postage, :inventory, :maji_flag, :action, :category_id

  def initialize(
    id:,
    name:,
    price:,
    images:,
    description:,
    postage:,
    inventory:,
    maji_flag:,
    category_id:,
    action:)
    @id = id
    @name = name
    @price = price
    @images = images
    @description = description
    @postage = postage
    @inventory = inventory
    @maji_flag = maji_flag
    @action = action
    @category_id = category_id
    @idc = ItemCommand.new
  end

  def self.new(value)
    errors = []
    name, err = Name.new(value: value[:name])
    errors.push(err) unless name

    price, err = Price.new(value: value[:price])
    errors.push(err) unless price

    description, err = Description.new(value: value[:description])
    errors.push(err) unless description

    postage, err = Postage.new(value: value[:postage])
    errors.push(err) unless postage

    inventory, err = Inventory.new(value: value[:inventory])
    errors.push(err) unless inventory

    maji_flag, err = Flag.new(value: value[:maji_flag])
    errors.push(err) unless maji_flag

    category_id, err = CategoryId.new(value: value[:category_id])
    errors.push(err) unless category_id

    action, err = Action.new(value: value[:action])
    errors.push(err) unless action
    # Imageクラスに配列ごと渡して@value=[{}]の形にする
    images, err = Image.new(value: value['images'], action: action.value)
    errors.push(err) unless images

    raise errors.join(', ') unless errors.blank?

    super(
      id: value[:id],
      name: name,
      price: price,
      description: description,
      images: images,
      postage: postage,
      category_id: category_id,
      inventory: inventory,
      maji_flag: maji_flag,
      action: action
    )
  end

  def create
    @idc.create_db(
      {
      name: @name,
      price: @price,
      description: @description,
      images: @images,
      postage: @postage,
      category_id: @category_id,
      inventory: @inventory,
      maji_flag: @maji_flag,
      action: @action
      }
    )
  rescue StandardError => e
    raise e
  end

  def update
    @idc.update_db(
      id: @id,
      name: @name,
      price: @price,
      description: @description,
      images: @images,
      postage: @postage,
      category_id: @category_id,
      inventory: @inventory,
      maji_flag: @maji_flag,
      action: @action
    )
  rescue StandardError => e
    raise e
  end

  def update_image_count(id, count)
    @idc.update_image_count(id, count)
  rescue StandardError => e
    raise e
  end


  class << self
    def index
      idq = ItemQuery.new
      idq.get_all
    end

    def find(id)
      idq = ItemQuery.new
      item = idq.find(id)
      raise "商品#{SystemMessage::NOTFOUND}" if item.nil?
      item
    end

    def delete(id)
      idc = ItemCommand.new
      idc.delete_db(id)
    rescue StandardError => e
      raise e
    end
  end
end
