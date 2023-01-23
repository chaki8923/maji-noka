require 'date'
class AuthController < ApplicationController
  skip_before_action :check_logined
  def new
    @data = AdminUser.new
  end

  def login
    @data = AdminUser.new(auth_params)
    res = @data.login(auth_params)

    if res == true
      admin_user = @data.get_admin_user(auth_params)
      session[:user] = eval(admin_user)
      Rails.logger.debug "ログイン期限---------------------------------#{Settings.session_limit.to_i}"
      session[:limit] = Time.now + Settings.session_limit.to_i
      redirect_to index_path
    else
      render action: 'new'
    end
  end

  private
   def auth_params
    params.require(:admin_user).permit(:email, :password)
   end

end