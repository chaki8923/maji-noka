# frozen_string_literal: true

require 'sequel'

class PurchaseCommand # rubocop:disable Style/Documentation
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def toggle_support_flag(purchase_id:, support_flag:)
    DB[:Purchase]
    .returning(:id)
    .where(
      id: purchase_id
    )
    .update(
      support_flag: support_flag,
      updatedAt: 'NOW()'

    )
  end

  private

  def update_params(schedule)
    {
      updated_at: 'NOW()',
      created_at: 'NOW()'
    }
  end
end
