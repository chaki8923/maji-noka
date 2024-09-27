# frozen_string_literal: true
class GoogleApiController < ApplicationController # rubocop:disable Style/Documentation
  before_action :set_csrf_token_header

  def create
    Rails.logger.debug "X-CSRF-Token>>>>>>>>>>>>>> #{request.headers['X-CSRF-Token']}"
    @google_api = GoogleApi.new(google_api_params)
    res = @google_api.create
    if res == true
      redirect_to index_path, notice: 'APIが登録されました'
    else
      render 'admin_user/index'
    end
  end

  def update
    Rails.logger.debug "X-CSRF-Token>>>>>>>>>>>>>>> #{request.headers['X-CSRF-Token']}"
    @google_api_instance = GoogleApi.new(google_api_params)
    res = @google_api_instance.update
    if res == true
      redirect_to index_path, notice: "apiが更新されました"
    else
      redirect_to index_path, alert: "エラーで更新されませんでした"
    end

  end

  def find
    @instance = GoogleApi.new
    @google_api = @instance.find(@current_user["id"])
    if @google_api[:err_message].present?
      render json: {err_message: @google_api[:err_message]}
    else
      render json: @google_api
    end
  end


  private

  def google_api_params
    params.require(:google_api).permit(
      :id,
      :api_key,
      :user_id,
      :calendar_id
    )
  end
end
