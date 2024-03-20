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
        image_count: item.images.value.count,
        category_id: item.category_id.value,
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

  def update_image_count(id, count)
    DB[:items]
    .where(
      id: id
    )
    .update(image_count: count)
  end

  private

  def update_params(item)
    {
      name: item.name.value,
      price: item.price.value,
      description: item.description.value,
      postage: item.postage.value,
      inventory: item.inventory.value,
      maji_flag: item.maji_flag.value,
      category_id: item.category_id.value,
      updated_at: 'NOW()',
      created_at: 'NOW()'
    }
  end
end
