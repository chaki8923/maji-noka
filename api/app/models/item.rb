Dir['/api/app/domains/value_object/*.rb'].each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }


class Item
  include ActiveModel::Model
  attr_accessor :name, :price, :images, :description,:postage, :inventory, :maji_flag
  
    def initialize(name:, price:, images:, description:)
      @name = name
      @price = price
      @images = images
      @description = description
      @postage = postage
      @inventory = inventory
      @maji_flag = maji_flag
      @idc = ItemCommand.new
    end 

    def self.new(value)
      file_data = JSON.parse(value["images"])
      name, err = Name.new(value: value[:name])
      return nil, err unless name
      price, err = Price.new(value: value[:price])
      return nil, err unless price
      description, err = Description.new(value: value[:description])
      return nil, err unless description
      # Imageクラスに配列ごと渡して@value=[{}]の形にする
      images, err =  Image.new(value: file_data)
      return nil, err unless images
      
      
      Rails.logger.debug "images---------------------------------#{images}"
      super(name: name, price: price, description: description, images: images)
    end

    def create(params)
      @idc.create_db(params)
    end 

    def self.index
      idq = ItemQuery.new
      idq.get_all
    end 

end