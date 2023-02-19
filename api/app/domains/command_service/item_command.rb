require 'sequel'

class ItemCommand
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(item)
 
    Rails.logger.debug "DBimages---------------------------------#{item.inspect}"
    DB[:item]
    .insert(name: item.name.value,
            price: item.price.value,
            images: item.images.value.to_json,
            description: item.description.value,
            postage: item.postage.value,
            inventory: item.inventory.value,
            maji_flag: item.maji_flag.value,
            updated_at: 'NOW()',
            created_at: 'NOW()' )
  end

  def update_db(item)
    Rails.logger.debug "DBimages---------------------------------#{item.inspect}"
    DB[:item]
    .update(
      id: item.id,
      name: item.name.value,
      price: item.price.value,
      images: item.images.value.to_json,
      description: item.description.value,
      postage: item.postage.value,
      inventory: item.inventory.value,
      maji_flag: item.maji_flag.value,
      updated_at: 'NOW()',
      created_at: 'NOW()' )
  end
end