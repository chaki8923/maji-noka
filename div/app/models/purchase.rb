# frozen_string_literal: true

class Purchase < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :customerId,
                :itemId


  def create(params); end

  def update(params); end

  def index
    purchase = execute_api('purchase/index', method: 'get')
    ## TODO:Chakiあとで消す
   Rails.logger.debug "purchase---------------------------------#{purchase}"
    make_list(purchase)
  end
end
