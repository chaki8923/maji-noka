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
    end 

    def self.new(value)
      Rails.logger.debug "API_new---------------------------------#{value}"
      Rails.logger.debug "API_email---------------------------------#{value[:email]}"
      email, err = Email.new(value: value[:email])
      return nil, err unless email
      password, err = Password.new(value: value[:password])
      return nil, err unless password

      super(email: email, password: password)
    end

    def create(params)
      @adc.create_db(params)
    end

end