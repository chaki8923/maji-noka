# frozen_string_literal: true

class ApplicationController < ActionController::Base # rubocop:disable Style/Documentation
  protect_from_forgery with: :exception
  include ItemHelper
  # エラーページテスト用
  # rescue_from ActiveRecord::RecordNotFound, with: :render_404
  # rescue_from StandardError, with: :render_500
  before_action :check_logined
  before_action :set_csrf_token_header


  def render_404
    render file: Rails.root.join('public/404.html').to_s, status: :not_found, layout: false, content_type: 'text/html'
  end

  def render_500(error)
    logger.error("エラークラス: #{error.class}")
    logger.error("エラーメッセージ : #{error.message}")
    logger.error('バックトレース -------------')
    # logger.error(error.backtrace.("\n"))
    logger.error('-------------')
    render file: Rails.root.join('public/500.html').to_s, status: :internal_server_error, layout: false, content_type: 'text/html'
  end

  def check_logined
    if check_session?(session)
      session.clear
      redirect_to login_path and return
    else
      @current_user = session[:user]
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
