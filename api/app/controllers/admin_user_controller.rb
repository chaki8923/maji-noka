Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }
class AdminUserController < ApplicationController
    after_action :set_csrf_token_header

    def signup
      admin_user = AdminUsers.new(admin_user_params)

      # エラーの場合はオブジェクトではなくArrayで返ってくる
      if admin_user.class == Array
        render json: admin_user[1]
      else
        res = admin_user.create(admin_user)
      end
    end

    def login
      auth = Auth.new
      res = auth.check(admin_user_params)
      # エラーの場合はオブジェクトではなくArrayで返ってくる
      if res.class == Array
        render json: res[1]
      else
        return true
      end
    end


    def get_admin_user
        data = AdminQuery.new
        res = data.get_admin_user(admin_user_params[:email])
        ## TODO：あとで消す
        Rails.logger.debug "get_admin_user結果---------------------------------#{res}"
        render json: res
    end

    def get_calendar
        data = AdminQuery.new
        res = data.get_admin_user(params["email"])
        ## TODO：あとで消す
        Rails.logger.debug "get_admin_user結果---------------------------------#{res}"
        render json: res
    end

    private
    def admin_user_params
     params.permit(:email, :password)
    end
end