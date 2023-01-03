require 'sequel'
class ItemCommand
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(item)
    ## TODO：あとで消す
    Rails.logger.debug "Item_create---------------------------------#{item.inspect}"
    Rails.logger.debug "Item_名前---------------------------------#{item.name.value}"
    Rails.logger.debug "Item_file---------------------------------#{item.file.value}"
    Rails.logger.debug "Item_説明---------------------------------#{item.description.value}"
    DB[:item]
    .insert(name: item.name.value,
            price: item.price.value[:value],
            images: {"image1" => item.file.value[:value]},
            description: item.description.value[:value],
            updated_at: 'NOW()',
            created_at: 'NOW()' )
  end
end