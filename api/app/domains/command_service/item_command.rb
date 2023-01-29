require 'sequel'

class ItemCommand
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(item)
 
    Rails.logger.debug "DBimages---------------------------------#{item.images.value.class}"
    DB[:item]
    .insert(name: item.name.value,
            price: item.price.value,
            images: item.images.value.to_json,
            description: item.description.value,
            updated_at: 'NOW()',
            created_at: 'NOW()' )
  end
end