# frozen_string_literal: true

class AdminUser < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :password, :email

  def signup(params)
    res = execute_api('admin_user/signup', params, method: 'post')
    convert_boolean(res)
  end

  def login(params)
    res = execute_api('admin_user/login', params, method: 'post')
    convert_boolean(res)
  end

  def get_admin_user(params)
    execute_api('admin_user/get_admin_user', params, method: 'get')
  end
end
