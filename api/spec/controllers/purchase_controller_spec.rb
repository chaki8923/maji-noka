require 'rails_helper'
require 'faker'
require 'securerandom'


RSpec.describe PurchaseController, type: :request  do
  it "注文情報を全て取得できること" do
    params = {}
    get "/purchase/index", params: params
    expect(response.status).to eq 200
  end
end
