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
  Rails.logger.debug "iten_command---------------------------------#{name.value}"
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
    DB[:items]
      .returning(:id)
      .where(
        id: id
      )
      .update(update_params(
        name: name,
        price: price,
        description: description,
        images: images,
        postage: postage,
        category_id: category_id,
        inventory: inventory,
        maji_flag: maji_flag,
        action: action
        )
      )
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

  def update_params(
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
    {
      name: name.value,
      price: price.value,
      description: description.value,
      postage: postage.value,
      inventory: inventory.value,
      maji_flag: maji_flag.value,
      category_id: category_id.value,
      updated_at: 'NOW()',
      created_at: 'NOW()'
    }
  end
end
