# frozen_string_literal: true

require 'sequel'

module CommandService
  class GoogleApiCommand # rubocop:disable Style/Documentation
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
     # 新規作成
     def create_db(api_key:, calendar_id:, user_id:)
      DB[:google_api]
        .returning(:id)
        .insert(
          api_key: api_key.value,
          calendar_id: calendar_id.value,
          user_id: user_id.value,
          updated_at: 'NOW()',
          created_at: 'NOW()'
        )
    end
  
    def update_db(id:, api_key:, calendar_id:, user_id:)
      DB[:google_api]
        .returning(:id)
        .where(user_id: user_id.value)
        .update(
          api_key: api_key.value,
          calendar_id: calendar_id.value,
          updated_at: "NOW()",
          created_at: "NOW()"
        )
    end
  
  end
end
