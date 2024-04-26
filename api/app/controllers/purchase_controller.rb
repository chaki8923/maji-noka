# frozen_string_literal: true
class PurchaseController < ApplicationController # rubocop:disable Style/Documentation
  def index
    purchase = Purchase.index
    render json: purchase
  end

  private
end
