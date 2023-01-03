Dir['/api/app/domains/value_object/*.rb'].each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }


class Item
  include ActiveModel::Model
  attr_accessor :name, :price, :file, :description
  
    def initialize(name:, price:, file:, description:)
      @name = name
      @price = price
      @file = file
      @description = description
      @idc = ItemCommand.new
    end 

    def self.new(value)
      file_data = eval(value[:file]).symbolize_keys
      ## TODO：あとで消す
      Rails.logger.debug "valueだよ---------------------------------#{value[:file]}"
      Rails.logger.debug "file_name_data---------------------------------#{file_data[:file_name]}"
      name, err = Name.new(value: value[:name])
      return nil, err unless name
      price, err = Price.new(value: value[:price])
      return nil, err unless price
      description, err = Description.new(value: value[:description])
      return nil, err unless description
      file, err = Image.new(value: file_data[:file_name])
      return nil, err unless file

     
      super(name: name, price: price, description: description, file: file)
    end

    def create(params)
      @idc.create_db(params)
    end

    

end