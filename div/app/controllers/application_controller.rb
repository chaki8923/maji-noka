# frozen_string_literal: true

class ApplicationController < ActionController::Base # rubocop:disable Style/Documentation
  protect_from_forgery with: :exception
  include ItemHelper
  before_action :check_logined
  before_action :set_csrf_token_header

  def check_logined
    if check_session?(session)
      session.clear
      redirect_to login_path and return
    else
      @current_user = session[:user]
      Rails.logger.info "ユーザー情報---------------------------------#{@current_user}"
    end
  end

  def change_json(str)
    JSON.parse(str)
  end

  def set_csrf_token_header
    response.set_header('X-CSRF-Token', form_authenticity_token)
  end

  private

  def check_session?(session)
    session[:user].nil? || session[:limit].nil? || session[:limit] < Time.now
  end
end
