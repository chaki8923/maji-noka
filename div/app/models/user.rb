# frozen_string_literal: true

class User < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :id,
                :name


  def create(params); end

  def update(params); end

  def index
    customers = execute_api('users/index', method: 'get')
    make_list(customers)
  end
end
