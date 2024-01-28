class ApplicationController < ActionController::Base
  include ItemHelper
  before_action :check_logined

  def check_logined
    if check_session?(session)
      session[:user] = nil
      Rails.logger.info "ログイン画面にリターン---------------------------------#{session[:limit]}"
      redirect_to login_path and return
    else
      @current_user = session[:user]
      Rails.logger.info "ユーザー情報---------------------------------#{@current_user}"
    end
  end

  def change_json(str)
    return JSON.parse(str)
  end

  private
  def check_session?(session)
    session[:user].nil? || session[:limit].nil? ||session[:limit] < Time.now
  end
end
