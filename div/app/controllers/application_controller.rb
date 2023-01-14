class ApplicationController < ActionController::Base
  before_action :check_logined

  def check_logined
    session[:user] = nil if session[:limit] < Time.now
    ## TODO：あとで消す
    Rails.logger.debug "session[:user]---------------------------------#{session[:user]}"
    Rails.logger.debug "session[:limit]---------------------------------#{session[:limit]}"
    Rails.logger.debug "Time.now---------------------------------#{Time.now}"
    if session[:user].nil? || session[:limit] < Time.now
      Rails.logger.debug "ログイン画面にリターン---------------------------------#{session[:limit]}"
      redirect_to login_path and return
    end
  end
end
