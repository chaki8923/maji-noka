# frozen_string_literal: true

Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }
class AdminUserController < ApplicationController # rubocop:disable Style/Documentation
  after_action :set_csrf_token_header

  def signup
    admin_user = AdminUsers.new(admin_user_params)

    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if admin_user.instance_of?(Array)
      render json: admin_user[1]
    else
      admin_user.create(admin_user)
    end
  end

  def login
    auth = Auth.new
    res = auth.check(admin_user_params)
    render json: res
  end

  def get_admin_user # rubocop:disable Naming/AccessorMethodName
    data = AdminQuery.new
    res = data.get_admin_user(admin_user_params[:email])
    render json: res
  end

  def get_calendar # rubocop:disable Naming/AccessorMethodName
    data = AdminQuery.new
    res = data.get_admin_user(params['email'])
    render json: res
  end

  private

  def admin_user_params
    params.permit(:email, :password)
  end
end
