Dir['/api/app/domains/value_object/*.rb'].each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }


class Item
  include ActiveModel::Model
  attr_accessor :id, :name, :price, :images, :description,:postage, :inventory, :maji_flag
  
    def initialize(id:, name:, price:, images:, description:, postage:, inventory:, maji_flag:)
      @id = id
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
      postage, err = Postage.new(value: value[:postage])
      return nil, err unless postage
      inventory, err = Inventory.new(value: value[:inventory])
      return nil, err unless inventory
      maji_flag, err = Flag.new(value: value[:maji_flag])
      return nil, err unless maji_flag
      # Imageクラスに配列ごと渡して@value=[{}]の形にする
      images, err =  Image.new(value: file_data)
      return nil, err unless images
      
      super(
        id: value[:id], 
        name: name, 
        price: price, 
        description: description, 
        images: images, 
        postage: postage,
        inventory: inventory,
        maji_flag: maji_flag
      )
    end

    def create(params)
      @idc.create_db(params)
    end 

    def update(params)
      @idc.update_db(params)
      rescue => e
        raise e
    end 
   
    class << self
      def index
        idq = ItemQuery.new
        idq.get_all
      end 

      def find(id)
        idq = ItemQuery.new
        idq.find(id)
      end
    end

    

end