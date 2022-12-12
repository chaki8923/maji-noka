class AdminUserController < ApplicationController

    def login
        ## TODO:あとで消す
        Rails.logger.debug "api---------------------------------#{params}"
        admin_user = AdminUsers.new
        res = admin_user.create(params)
    end
end