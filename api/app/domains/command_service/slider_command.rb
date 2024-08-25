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
    images:
  )
    DB[:sliders]
      .returning(:id)
      .where(
        id: id
      )
      .update(
        images: images
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
    DB[:sliders]
    .where(
      id: id
    )
    .update(images: Sequel.cast(images.to_json, :jsonb))
  end
end
