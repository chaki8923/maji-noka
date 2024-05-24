require 'rails_helper'
require 'faker'
require 'securerandom'


RSpec.describe PurchaseController, type: :request  do
  it "スケジュールを全て取得できること" do
    params = {}
    get "/schedule/index", params: params
    expect(response.status).to eq 200
  end

  it "スケジュールを登録できること" do
    params = {
      id: "",
      title: "米を届ける",
      start_time: "2024-05-21 14:43:00 +0000",
      end_time: "2024-05-21 14:47:00 +0000",
      memo: "米を佐藤さんちに届ける",
      schedule_date: "2024-05-22"
    }
    post "/schedule/create", params: params
    expect(response.status).to eq 200
  end


  it "スケジュールを更新できること" do
    params = {
      id: "1",
      title: "米を届ける!!",
      start_time: "14:43",
      end_time: "14:47",
      memo: "米を佐藤さんちに届ける",
      schedule_date: "2024-05-22T00:00:00.000+00:00"
    }
    post "/schedule/update", params: params
    expect(response.status).to eq 200
  end

  it "スケジュールが削除できること" do
    params = { id: "1" }
    post "/schedule/delete", params: params
    expect(response.status).to eq 200
  end



end
