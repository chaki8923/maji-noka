class AdminUser < BaseModel
  attr_accessor :password, :email

  def login(params)
    res = execute_api('admin_user/login', params, method: 'post')
  end

end