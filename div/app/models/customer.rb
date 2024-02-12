# frozen_string_literal: true

class Customer < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :id,
                :name,
                :gender,
                :tell,
                :email,
                :city,
                :prefecture,
                :address

  def create(params); end

  def update(params); end

  def index; end
end
