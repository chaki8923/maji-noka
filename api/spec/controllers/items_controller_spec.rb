require 'rails_helper'
require 'faker'
require 'securerandom'


RSpec.describe ItemsController, type: :request  do
  # 画像データを作成するヘルパーメソッド
  def uploaded_file(filename)
    ActionDispatch::Http::UploadedFile.new(
      tempfile: File.new(Rails.root.join("spec/fixtures/#{filename}")),
      filename: filename,
      type: 'image/jpeg'
    )
  end

  # 画像データを配列に格納する
  let(:uploaded_files) do
  [
    uploaded_file('test_image1.jpg'),
    uploaded_file('test_image2.jpg'),
    uploaded_file('test_image3.jpg'),
    uploaded_file('test_image4.jpg')
  ]
  end

  it "アイテムが登録できる" do
    params = {
      name: "商品だぜ",
      price: "1200",
      description: "美味しすぎる！",
      postage: "120",
      inventory: "90",
      maji_flag: "0",
      category_id: "1",
      images: uploaded_files
    }
    post "/item/create", params: params
    expect(response.status).to eq 200
  end


  it "アイテムが全て取得されること" do
    params = {}
    get "/item/index", params: params
    expect(response.status).to eq 200
  end

  it "画像がないと商品登録ができないこと" do
    params = {
      name: "商品",
      price: "1200",
      description: "美味しすぎる！",
      postage: "120",
      inventory: "90",
      maji_flag: "0",
      category_id: "1",
    }
    post "/item/create", params: params
    expect(response.status).to eq 500
  end

  it "商品編集画面で商品が取得できること" do
    params = {
      "category_id": "1",
      "description": "甘くて美味しいお米",
      "id": "1",
      "images": [
        "",
        "",
        "",
        ""
      ],
      "inventory": "192",
      "maji_flag": "1",
      "name": "お米3kg",
      "postage": "120",
      "price": "1500"
    }
    get "/item/edit", params: params
    expect(response.status).to eq 200
  end

  it "商品が更新できること" do
    params = {
      id: "1",
      name: "お米3kg",
      price: "1500",
      description: "甘くて美味しいお米",
      postage: "120",
      inventory: "192",
      maji_flag: "1",
      category_id: "1"
    }
    post "/item/update", params: params
    expect(response.status).to eq 200
  end

  it "商品を削除できること" do
  params = {
    "id": "1"
  }
  post "/item/delete", params: params
  expect(response.status).to eq 200
  end



end
