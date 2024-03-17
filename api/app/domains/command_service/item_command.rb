# frozen_string_literal: true

require 'sequel'

class ItemCommand # rubocop:disable Style/Documentation
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(item)
    DB[:items]
      .returning(:id)
      .insert(
        name: item.name.value,
        price: item.price.value,
        description: item.description.value,
        postage: item.postage.value,
        inventory: item.inventory.value,
        images_count: item.images.value.size,
        maji_flag: item.maji_flag.value,
        updated_at: 'NOW()',
        created_at: 'NOW()'
      )
  end

  def update_db(item)
    DB[:items]
      .returning(:id)
      .where(
        id: item.id
      )
      .update(update_params(item))
  end

  def delete_db(id)
    ## TODO：あとで消す
    Rails.logger.debug "削除id---------------------------------#{id}"
    DB[:items]
      .returning(:id)
      .where(:id => id)
      .delete
  end

  private

  def update_params(item)
    {
      name: item.name.value,
      price: item.price.value,
      description: item.description.value,
      postage: item.postage.value,
      inventory: item.inventory.value,
      maji_flag: item.maji_flag.value
      updated_at: 'NOW()',
      created_at: 'NOW()'
    }
  end
end
