# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Auth # rubocop:disable Style/Documentation
  def check(value)
    adq = AdminQuery.new
    errors = []
    hash_pass = adq.get_hash_password(value)
    ## TODO：あとで消す
    Rails.logger.debug "hash_pass---------------------------------#{hash_pass}"
    raise SystemMessage::AUTH_ERR if hash_pass.blank?
    raise SystemMessage::AUTH_ERR if adq.check_mail(value['email']).nil?
    raise SystemMessage::AUTH_ERR unless BCrypt::Password.new(hash_pass[:password]) == value['password']

    raise errors.join(', ') unless errors.blank?
    { value: nil, success_message: SystemMessage::API_SUCCESS }
  end
end
