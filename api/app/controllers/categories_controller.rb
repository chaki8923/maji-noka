# frozen_string_literal: true
class CategoriesController < ApplicationController # rubocop:disable Style/Documentation
  def index
    res = Category.index
    render json: res
  end

  private
end

