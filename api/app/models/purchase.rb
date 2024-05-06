# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Purchase # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :customerId, :itemId, :purchase_id, :state, :country, :postal_code, :line1, :line2

  def initialize(
    purchase_id:
  )
    # @customerId = customerId
    # @itemId = itemId
    @purchase_id = purchase_id
    @pcs = PurchaseCommand.new
  end

  def self.new(value)
    errors = []
    purchase_id, err = ModelId.new(value: value[:purchase_id])
    errors.push(err) unless purchase_id
    raise errors.join(', ') unless errors.blank?
    super(
      purchase_id: value[:purchase_id],
    )
  end

  def toggle_support_flag(purchase_id:, support_flag:)
    @pcs.toggle_support_flag(purchase_id: purchase_id, support_flag: support_flag)
  end

  class << self
    def index
      pdq = PurchaseQuery.new
      pdq.get_all
    end

    def find(id:)
      pdq = PurchaseQuery.new
      pdq.find(id: id)
    end

    def delete(id)
    end
  end
end
