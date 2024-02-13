# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Auth # rubocop:disable Style/Documentation
  def check(value)
    adq = AdminQuery.new
    ## TODO：あとで消す
    Rails.logger.debug "value---------------------------------#{value}"
    hash_pass = adq.get_hash_password(value)

    return { value: nil, err_message: SystemMessage::AUTH_ERR } if adq.check_mail(value['email']).nil?
    return { value: nil, err_message: SystemMessage::AUTH_ERR } unless BCrypt::Password.new(hash_pass[:password]) == value['password']

    { value: nil, success_message: SystemMessage::API_SUCCESS }
  end
end
