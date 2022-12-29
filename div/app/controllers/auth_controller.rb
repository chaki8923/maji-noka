class AuthController < ApplicationController

  def new
    @data = AdminUser.new
  end

  def index
    
  end

  def login
    @data = AdminUser.new(auth_params)
    res = @data.login(auth_params)

    if res == true
      admin_user = @data.get_admin_user(auth_params)
      ## TODO：あとで消す
      Rails.logger.debug "admin_user---------------------------------#{admin_user}"
      session[:password] = admin_user["password"]
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