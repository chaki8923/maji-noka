# frozen_string_literal: true

require 'date'
class AuthController < ApplicationController # rubocop:disable Style/Documentation
  skip_before_action :check_logined
  after_action :set_csrf_token_header, only: [:new, :login]
  skip_before_action :verify_authenticity_token
  def new
    @admin_user = AdminUser.new
  end

  def login
    @admin_user = AdminUser.new(auth_params)
    # set_csrf_token_header
    Rails.logger.debug "Request Headers>>>>>>>>>>>>>>>>>>>>>>: #{request.headers['X-CSRF-Token']}"
    res = @admin_user.login(auth_params)
    if res == true
      admin_user = @admin_user.get_admin_user(auth_params)
      session[:user] = admin_user
      Rails.logger.debug "ログイン期限---------------------------------#{Settings.session_limit.to_i}"
      session[:limit] = Time.now + Settings.session_limit.to_i
      redirect_to home_path, notice: 'ログインしました'
    else
      render action: 'new'
    end
  end

  def logout
    session.clear
    redirect_to login_path
  end

  private

  def auth_params
    params.require(:admin_user).permit(:email, :password)
  end
end
