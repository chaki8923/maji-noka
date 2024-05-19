class PurchaseController < ApplicationController
  def index
    purchase = Purchase.new
    @data = SendMail.new
    @purchase = Kaminari.paginate_array(purchase.index).page(params[:page]).per(5)
  end

  private

end
