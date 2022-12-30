class ItemController < ApplicationController


  def new
    @data = Item.new
  end

  def create
    @data = AdminUser.new(admin_user_params)
    res = @data.signup(admin_user_params)
    if res == true
      redirect_to index_path
    else
      render action: 'new'
    end
  end

  def index
    admin_user = AdminUser.new
    session[:user] = session[:user].symbolize_keys
  end

  private
   def item_params
    params.require(:item).permit(:name, :price, :image, :description)
   end

end