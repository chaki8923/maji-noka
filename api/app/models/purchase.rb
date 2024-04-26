# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Purchase # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :customerId, :itemId

  def initialize(
    customerId:,
    itemId:)
    @customerId = customerId
    @itemId = itemId
  end

  class << self
    def index
      pdq = PurchaseQuery.new
      pdq.get_all
    end

    def find(id)

    end

    def delete(id)
    end
  end
end
