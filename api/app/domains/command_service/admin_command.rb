require 'sequel'
class AdminCommand
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])      

  def create_db(params)
    ## TODO：あとで消す
    Rails.logger.debug "sequel_create---------------------------------#{}"
    DB[:admin_users].insert(email: params['email'],
        password: params['password'],
        updated_at: 'NOW()',
        created_at: 'NOW()' )
  end
end