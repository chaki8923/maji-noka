class AuthController < ApplicationController

  def new
    @data = AdminUser.new
  end

  def login
    @data = AdminUser.new(auth_params)
    res = @data.login(auth_params)

    if res == true
      admin_user = @data.get_admin_user(auth_params)
      ## TODO：あとで消す

      Rails.logger.debug "admin_userのクラス---------------------------------#{admin_user.class}"
      Rails.logger.debug "admin_user---------------------------------#{eval(admin_user)}"
      session[:user] = eval(admin_user)
      Rails.logger.debug "session_admin_user---------------------------------#{session[:user].class}"
      Rails.logger.debug "session_admin_user---------------------------------#{session[:user]}"
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