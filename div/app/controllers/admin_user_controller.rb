class AdminUserController < ApplicationController


  def new
    @data = AdminUser.new
  end


  def login
    @data = AdminUser.new(admin_user_params)
    res = @data.login(admin_user_params)
    ## TODO:あとで消す
    Rails.logger.debug "最後のres---------------------------------#{res.inspect}"
    if res == true
      render action: 'index'
    else
      render action: 'new'
    end

  end

  def index

  end


  private
   def admin_user_params
    params.require(:admin_user).permit(:email, :password)
   end

end