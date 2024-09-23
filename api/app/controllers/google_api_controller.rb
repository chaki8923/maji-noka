# frozen_string_literal: true

class GoogleApiController < ApplicationController # rubocop:disable Style/Documentation
  def create
    google_api = GoogleApi.new(google_api_params)
    google_api.create
    render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
  rescue => err_message
    ## TODO：あとで消す
    Rails.logger.debug "err_message---------------------------------#{err_message}"
    render json: {
             value: nil,
             err_message: err_message
           },
           status: :internal_server_error
  end

  def update
    google_api = GoogleApi.new(google_api_params)
    res = google_api.update
    render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
  rescue => err_message
    render json: {
             value: nil,
             err_message: err_message
           },
           status: :internal_server_error
  end

  def find
    res = GoogleApi.find(params[:user_id])
    render json: res
  end

  private

  def google_api_params
    params.permit(:id, :api_key, :user_id,:calendar_id)
  end

end
