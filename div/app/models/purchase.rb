# frozen_string_literal: true

class Purchase < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :customerId,
                :itemId


  def create(params); end

  def update(params); end

  def index
    purchase = execute_api('purchase/index', method: 'get')
    make_list(purchase)
  end
end
