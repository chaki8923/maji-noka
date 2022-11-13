class AdminUserController < ApplicationController
  def new
    render template: 'admin_user/new',status: 200
  end
end
