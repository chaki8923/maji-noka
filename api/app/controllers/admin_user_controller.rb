class AdminUserController < ApplicationController
    after_action :set_csrf_token_header

    def login
      admin_user = AdminUsers.new(admin_user_params)
      Rails.logger.debug "admmin_userCLASS---------------------------------#{admin_user.class}"
      Rails.logger.debug "admmin_user---------------------------------#{admin_user}"
      if admin_user.class == Array
        Rails.logger.debug "arrayです------------------------------#{admin_user}"
        render json: admin_user[1]
      else
        res = admin_user.create(admin_user_params)
      end
    end

    private
    def admin_user_params
     params.permit(:email, :password)
    end
end