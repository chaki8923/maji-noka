class PurchaseController < ApplicationController
  def index
    purchase = Purchase.new
    @purchase = purchase.index
    @data = SendMail.new
  end

  private

end
