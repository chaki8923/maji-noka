require 'rails_helper'
require 'faker'
require 'securerandom'


RSpec.describe CategoriesController, type: :request  do
  it "カテゴリーを全て取得できること" do
  params = {}
  get "/categories/index", params: params
  expect(response.status).to eq 200
  end
end
