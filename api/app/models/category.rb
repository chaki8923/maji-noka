# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Category # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :name

  def initialize(id:, name:)
    @id = id
    @name = name
  end

  class << self
    def index
      cdq = QueryService::CategoryQuery.new
      cdq.get_all
    end
  end
end
