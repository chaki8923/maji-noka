class AdminUserController < ApplicationController

  def new
    @data = AdminUser.new
  end

  def login
    admin_user = AdminUser.new
    res = admin_user.login(admin_user_params)
    ## TODO:あとで消す
    Rails.logger.debug "res---------------------------------#{res}"
    render action: 'index'
  end

  def index

  end


  private
   def admin_user_params
    params.require(:admin_user).permit(:email, :password)
   end
end