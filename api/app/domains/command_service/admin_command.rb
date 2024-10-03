# frozen_string_literal: true

require 'sequel'
module CommandService
  class AdminCommand # rubocop:disable Style/Documentation
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
    # 新規作成
    def create_db(user)
      DB[:admin_users].insert(email: user.email.value,
                              password: user.password.value,
                              updated_at: 'NOW()',
                              created_at: 'NOW()')
    end
  end
end
