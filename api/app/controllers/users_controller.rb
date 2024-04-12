# frozen_string_literal: true
class UsersController < ApplicationController # rubocop:disable Style/Documentation
  def index
    users = User.index
    render json: users
  end

  private
end
