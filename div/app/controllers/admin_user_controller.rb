require 'date'
class AdminUserController < ApplicationController
  skip_before_action :check_logined, only: [:new, :signup]
  def new
    @data = AdminUser.new
  end


  def signup
    @data = AdminUser.new(admin_user_params)
    res = @data.signup(admin_user_params)
    if res == true
      session[:limit] = Time.now + Settings.session_limit.to_i
      redirect_to index_path
    else
      render action: 'new'
    end
  end

  def index
    admin_user = AdminUser.new
    session[:user] = session[:user].symbolize_keys
  end

  def get_calender
    ## TODO:あとで消す
    Rails.logger.debug "#{controller_name}::Ajax開始---------------------------------#{params}"
    Rails.logger.debug "#{controller_name}::params[email]---------------------------------#{params["email"]}"
    admin_user = AdminUser.new
    res = admin_user.get_admin_user(params.permit(:email))
    render json: res
  end

  private
   def admin_user_params
    params.require(:admin_user).permit(:email, :password)
   end

end