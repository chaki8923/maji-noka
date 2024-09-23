# frozen_string_literal: true
class GoogleApiController < ApplicationController # rubocop:disable Style/Documentation

  def create
    @google_api = GoogleApi.new(google_api_params)
    res = @google_api.create
    if res == true
      redirect_to index_path, notice: 'APIが登録されました'
    else
      render 'admin_user/index'
    end
  end

  def update
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
      ## TODO：あとで消す
    	Rails.logger.debug "@google_api---------------------------------#{@google_api}"
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
