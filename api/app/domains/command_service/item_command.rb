# frozen_string_literal: true

require 'sequel'

class ItemCommand # rubocop:disable Style/Documentation
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(
    name:,
    price:,
    description:,
    images:,
    postage:,
    category_id:,
    inventory:,
    maji_flag:,
    action:
  )
    DB[:items]
      .returning(:id)
      .insert(
        name: name.value,
        price: price.value,
        description: description.value,
        postage: postage.value,
        inventory: inventory.value,
        image_count: images.value.count,
        category_id: category_id.value,
        maji_flag: maji_flag.value,
        updated_at: 'NOW()',
        created_at: 'NOW()'
      )
  end

  def update_db(
    id:,
    name:,
    price:,
    description:,
    images:,
    postage:,
    category_id:,
    inventory:,
    maji_flag:,
    action:
  )
  ## TODO：あとで消す
  Rails.logger.debug "item_update---------------------------------#{}"
    DB[:items]
      .returning(:id)
      .where(
        id: id
      )
      .update(
        name: name.value,
        price: price.value,
        description: description.value,
        postage: postage.value,
        category_id: category_id.value,
        inventory: inventory.value,
        maji_flag: maji_flag.value,
        action: action.value
      )
  end

  def delete_db(id)
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
end
