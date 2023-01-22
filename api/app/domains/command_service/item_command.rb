require 'sequel'

class ItemCommand
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(item)
    ## TODO：あとで消す
    Rails.logger.debug "DB登録データ---------------------------------#{item.inspect}"
    DB[:item]
    .insert(name: item.name.value,
            price: item.price.value,
            image: item.images.value,
            description: item.description.value,
            updated_at: 'NOW()',
            created_at: 'NOW()' )
  end
end