Dir['/api/app/domains/value_object/*.rb'].each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }


class Item
  include ActiveModel::Model
  attr_accessor :name, :price, :images, :description
  
    def initialize(name:, price:, images:, description:)
      @name = name
      @price = price
      @images = images
      @description = description
      @idc = ItemCommand.new
    end 

    def self.new(value)
      ## TODO：あとで消す
      Rails.logger.debug "value---------------------------------#{value}"
      file_data = JSON.parse(value["images"])

      Rails.logger.debug "file_data---------------------------------#{file_data}"
      name, err = Name.new(value: value[:name])
      return nil, err unless name
      price, err = Price.new(value: value[:price])
      return nil, err unless price
      description, err = Description.new(value: value[:description])
      return nil, err unless description
      # Imageクラスに配列ごと渡して@value=[{}]の形にする
      images = file_data.map do |file|
        Rails.logger.debug "file[idx]---------------------------------#{file["name"]}"
        Image.new(value: file["name"])
        # return nil, err unless file
      end
      
      Rails.logger.debug "images---------------------------------#{images}"
      super(name: name, price: price, description: description, images: images)
    end

    def create(params)
      @idc.create_db(params)
    end 

end