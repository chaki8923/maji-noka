class UsersController < ApplicationController
  def index
    customer = User.new
    @customers = customer.index
    ## TODO:あとで消す
    Rails.logger.debug "---------------------------------#{}"
  end

  private
   def user_params
    params.require(:user)
    .permit(
      :id,
      :name,
      :gender,
      :tell,
      :email,
      :city,
      :prefecture,
      :address,
    )

    end
end
