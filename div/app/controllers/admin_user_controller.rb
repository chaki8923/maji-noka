# frozen_string_literal: true

require 'date'
class AdminUserController < ApplicationController # rubocop:disable Style/Documentation
  skip_before_action :check_logined, only: %i[new signup]
  skip_before_action :verify_authenticity_token
  after_action :set_csrf_token_header
  def new
    @admin_user = AdminUser.new
  end

  def signup
    @admin_user = AdminUser.new(admin_user_params)
    res = @admin_user.signup(admin_user_params)
    if res == true
      session[:limit] = Time.now + Settings.session_limit.to_i
      admin_user = @admin_user.get_admin_user(admin_user_params)
      session[:user] = admin_user
      redirect_to home_path
    else
      render action: 'new'
    end
  end

  def index
    @schedule_instance = Schedule.new
    @google_api = GoogleApi.new
    @db_google_api = @google_api.find(@current_user["id"])
    session[:user] = session[:user].symbolize_keys
  end

  def get_calender # rubocop:disable Naming/AccessorMethodName
    admin_user = AdminUser.new
    res = admin_user.get_admin_user(params.permit(:email))
    render json: res
  end

  private

  def admin_user_params
    params.require(:admin_user).permit(:email, :password)
  end
end
