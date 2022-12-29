class AdminUserController < ApplicationController


  def new
    @data = AdminUser.new
  end


  def signup
    @data = AdminUser.new(admin_user_params)
    res = @data.signup(admin_user_params)
    if res == true
      redirect_to index_path
    else
      render action: 'new'
    end
  end

  def index
    admin_user = AdminUser.new
    
  end

  def get_calender
    ## TODO:あとで消す
    Rails.logger.debug "Ajax開始---------------------------------#{}"
    admin_user = AdminUser.new
    res = admin_user.get_admin_user(admin_user_params)
  end

  private
   def admin_user_params
    params.require(:admin_user).permit(:email, :password)
   end

end