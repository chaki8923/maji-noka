class CustomersController < ApplicationController
  def index
  end
  
  private
   def customer_params
    params.require(:customer)
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