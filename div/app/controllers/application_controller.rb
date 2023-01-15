class ApplicationController < ActionController::Base
  before_action :check_logined

  def check_logined
    session[:user] = nil if session[:limit] < Time.now
    if session[:user].nil? || session[:limit] < Time.now
      Rails.logger.info "ログイン画面にリターン---------------------------------#{session[:limit]}"
      redirect_to login_path and return
    else
      @current_user = session[:user]
      Rails.logger.info "ユーザー情報---------------------------------#{@current_user}"
    end
  end
end
