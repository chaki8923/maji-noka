# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Item # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :name, :price, :images, :description, :postage, :inventory, :maji_flag, :action

  def initialize(
    id:,
    name:,
    price:,
    images:,
    description:,
    postage:,
    inventory:,
    maji_flag:,
    action:
  )
    @id = id
    @name = name
    @price = price
    @images = images
    @description = description
    @postage = postage
    @inventory = inventory
    @maji_flag = maji_flag
    @action = action
    @idc = CommandService::ItemCommand.new
  end

  def self.new(value)
    errors = []
    name, err = ValueObject::Name.new(value: value[:name])
    errors.push(err) unless name

    price, err = ValueObject::Price.new(value: value[:price])
    errors.push(err) unless price

    description, err = ValueObject::Description.new(value: value[:description])
    errors.push(err) unless description

    postage, err = ValueObject::Postage.new(value: value[:postage])
    errors.push(err) unless postage

    inventory, err = ValueObject::Inventory.new(value: value[:inventory])
    errors.push(err) unless inventory

    maji_flag, err = ValueObject::Flag.new(value: value[:maji_flag])
    errors.push(err) unless maji_flag

    action, err = ValueObject::Action.new(value: value[:action])
    errors.push(err) unless action
    # Imageクラスに配列ごと渡して@value=[{}]の形にする
    images, err = ValueObject::Image.new(value: value['images'], action: action.value)
    errors.push(err) unless images

    raise errors.join(', ') unless errors.blank?

    super(
      id: value[:id],
      name: name,
      price: price,
      description: description,
      images: images,
      postage: postage,
      inventory: inventory,
      maji_flag: maji_flag,
      action: action
    )
  end

  def create
    @idc.create_db(
      name: @name,
      price: @price,
      description: @description,
      postage: @postage,
      inventory: @inventory,
      maji_flag: @maji_flag,
      action: @action
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
      postage: @postage,
      inventory: @inventory,
      maji_flag: @maji_flag
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
      idq = QueryService::ItemQuery.new
      idq.get_all
    end

    def find(id)
      idq = QueryService::ItemQuery.new
      item = idq.find(id)
      raise "商品#{SystemMessage::NOTFOUND}" if item.nil?
      item
    end

    def delete(id)
      idc = CommandService::ItemCommand.new
      idc.delete_db(id: id)
    rescue StandardError => e
      ## TODO：あとで消す
    	Rails.logger.debug "err---------------------------------#{e}"
      raise e
    end

    def set_image_path(id, image_path, file_name)
      idc = CommandService::ItemCommand.new
      idc.set_image_path(
        id: id,
        image_path: image_path,
        file_name: file_name
      )
    rescue StandardError => e
      raise e
    end

  end
end
