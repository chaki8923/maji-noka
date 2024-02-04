require 'sequel'

class ItemCommand
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(item)
    DB[:items]
    .insert(
      name: item.name.value,
      price: item.price.value,
      images: item.images.value.to_json,
      description: item.description.value,
      postage: item.postage.value,
      inventory: item.inventory.value,
      maji_flag: item.maji_flag.value,
      updated_at: 'NOW()',
      created_at: 'NOW()'
     )
  end

  def update_db(item)
    
    DB[:items]
    .where(
      id: item.id
    )
    .update(update_params(item))
  end

  private

  def update_params(item)
    images = item.images.value.present? ? item.images.value.to_json : nil
    params =
    {
      name: item.name.value,
      price: item.price.value,
      description: item.description.value,
      postage: item.postage.value,
      inventory: item.inventory.value,
      maji_flag: item.maji_flag.value,
      updated_at: 'NOW()',
      created_at: 'NOW()' 
    }
    if images.present?
      params.merge!(images: images)
    end
    params
  end
end