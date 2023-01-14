Dir['/api/app/domains/value_object/*.rb'].each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }


class AdminUsers
    include ActiveModel::Model
    attr_accessor :email, :password
    
    def initialize(email:, password:)
      @email = email
      @password = password
      @adc = AdminCommand.new
      @adq = AdminQuery.new
    end 

    def self.new(value)
      email, err = Email.new(value: value[:email])
      return nil, err unless email
      password, err = Password.new(value: value[:password])
      return nil, err unless password
      ## TODO：あとで消す
      Rails.logger.debug "最終的なpassword---------------------------------#{password}"
      super(email: email, password: password)
    end

    def create(params)
      @adc.create_db(params)
    end


    def get_admin_user
      @adq.get_admin_user(admin_user_params[:email])
    end

    

end