# frozen_string_literal: true

require 'sequel'
module CommandService
  class ItemCommand # rubocop:disable Style/Documentation
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
    # 新規作成
    def create_db(
      name:,
      price:,
      description:,
      postage:,
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
      postage:,
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
  
    def set_image_path(id:, image_path:, file_name:)
      DB[:items]
      .where(
        id: id
      )
      .update("#{file_name}".to_sym => image_path)
    end
  end
end
