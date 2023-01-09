require 'sequel'

class ItemCommand
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(item)
    DB[:item]
    .insert(name: item.name.value,
            price: item.price.value,
            image1: item.file.value,
            image2: item.file.value,
            image3: item.file.value,
            image4: item.file.value,
            description: item.description.value,
            updated_at: 'NOW()',
            created_at: 'NOW()' )
  end
end