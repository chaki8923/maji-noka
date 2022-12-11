class AdminUserController < ApplicationController


















  def new
    # render ('layouts/login')
  end



  private
  def admin_params
      params.require(:admin_user).permit(:email, :name, :comment, :title. :body)
  end

end