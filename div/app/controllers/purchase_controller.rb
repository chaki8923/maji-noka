class PurchaseController < ApplicationController
  def index
    purchase = Purchase.new
    @purchase = purchase.index
  end

  private

end
