require 'sequel'
class AdminUsers
    include ActiveModel::Model
    attr_accessor :email, :password
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])

    
    def create(params)
      create_db(params)
    end
    
    def create_db(params)
        DB[:admin_users].insert(email: params['email'],
            password: params['password'],
            updated_at: 'NOW()',
            created_at: 'NOW()' )
    end
end