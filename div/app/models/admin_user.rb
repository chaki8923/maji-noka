class AdminUser < BaseModel
  attr_accessor :password, :email

  def signup(params)
    res = execute_api('admin_user/signup', params, method: 'post')
  end

  def login(params)
    res = execute_api('admin_user/login', params, method: 'post')
  end

  def get_admin_user(params)
    res = execute_api('admin_user/get_admin_user', params, method: 'get')
  end

end