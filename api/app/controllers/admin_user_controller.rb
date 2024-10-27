# frozen_string_literal: true

Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }
class AdminUserController < ApplicationController # rubocop:disable Style/Documentation
  after_action :set_csrf_token_header

  def signup
    admin_user, err_message = AdminUsers.new(admin_user_params)
    if admin_user.nil?
      render json: {value: nil, err_message: err_message}, status: :internal_server_error
    else
      admin_user.create(admin_user)
      render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
    end
  end

  def login
    auth = Auth.new
    _, err_message = auth.check(admin_user_params)
    if err_message.nil?
     render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
    else
      render json: {value: nil, err_message: err_message}, status: :internal_server_error
    end
  end

  def get_admin_user # rubocop:disable Naming/AccessorMethodName
    data = QueryService::AdminQuery.new
    res = data.get_admin_user(admin_user_params[:email])
    render json: res
  end

  def get_calendar # rubocop:disable Naming/AccessorMethodName
    data = QueryService::AdminQuery.new
    res = data.get_admin_user(params['email'])
    render json: res
  end

  private

  def admin_user_params
    params.permit(:email, :password)
  end
end
