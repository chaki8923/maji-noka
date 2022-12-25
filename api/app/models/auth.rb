Dir['/api/app/domains/value_object/*.rb'].each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }


class Auth
  def check(value)
    adq = AdminQuery.new
    ## TODO：あとで消す
    Rails.logger.debug "value---------------------------------#{value}"
    hash_pass = adq.get_hash_password(value)

    return nil, SystemMessage::AUTH_ERR if adq.check_mail(value["email"]).nil?
    return nil, SystemMessage::AUTH_ERR unless BCrypt::Password.new(hash_pass[:password]) == value["password"]

    return true
  end
end