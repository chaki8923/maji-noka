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

  private
   def admin_user_params
    params.require(:admin_user).permit(:email, :password)
   end

end