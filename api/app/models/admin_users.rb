# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class AdminUsers # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :email, :password

  def initialize(email:, password:)
    @email = email
    @password = password
    @adc = AdminCommand.new
    @adq = AdminQuery.new
  end

  def self.new(value)
    errors = []
    email, err = Email.new(value: value[:email])
    errors.push(err) unless email
    password, err = Password.new(value: value[:password])
    errors.push(err) unless password
    return nil, errors.join(', ') unless errors.blank?
    super(email: email, password: password)
  end

  def create(params)
    @adc.create_db(params)
  end

  def get_admin_user
    @adq.get_admin_user(admin_user_params[:email])
  end
end
