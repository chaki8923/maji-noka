# frozen_string_literal: true

require 'sequel'

class SliderCommand # rubocop:disable Style/Documentation
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db
    DB[:sliders]
      .returning(:id)
      .insert(
        images: '{}',
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
    maji_flag:
  )
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
        maji_flag: maji_flag.value
      )
  end

  def delete_db(id:)
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

  def set_image_path(id:, images:)
    images_array_literal = "{#{images.map { |i| %Q("#{i}") }.join(',')}}"
    ## TODO:Chakiあとで消す
    Rails.logger.debug "images_array_literal---------------------------------#{images_array_literal}"

    DB[:sliders]
    .where(
      id: id
    )
    .update(images: Sequel.lit("ARRAY[?]::TEXT[]", images))
  end
end
