# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Auth # rubocop:disable Style/Documentation
  def check(value)
    adq = AdminQuery.new
    errors = []
    hash_pass = adq.get_hash_password(value)
    # return nil, SystemMessage::AUTH_ERR if hash_pass.blank?
    return nil, "登録されていないパスワード" if hash_pass.blank?
    return nil, "メールが登録されてない" if adq.check_mail(value[:email]).nil?
    # return nil, SystemMessage::AUTH_ERR if adq.check_mail(value['email']).nil?
    return nil, "パスワードが違う" unless BCrypt::Password.new(hash_pass[:password]) == value[:password]
    # return nil, SystemMessage::AUTH_ERR unless BCrypt::Password.new(hash_pass[:password]) == value['password']

    return nil, errors.join(', ') unless errors.blank?
    return SystemMessage::API_SUCCESS, nil
  end
end
