# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class User # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :name

  def initialize(
    id:,
    name:)
    @id = id
    @name = name
  end

  class << self
    def index
      idq = UserQuery.new
      idq.get_all
    end

    def find(id)

    end

    def delete(id)
    end
  end
end
