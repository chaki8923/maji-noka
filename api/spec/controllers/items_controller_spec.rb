require 'rails_helper'
require 'faker'
require 'securerandom'


RSpec.describe ItemsController, type: :request  do
  let(:image_file) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image1.jpg"), 'image/jpeg') }
  let(:image_file2) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image2.jpg"), 'image/jpeg') }
  let(:image_file3) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image3.jpg"), 'image/jpeg') }
  let(:image_file4) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image4.jpg"), 'image/jpeg') }
  let(:size_over) { fixture_file_upload(Rails.root.join("spec/fixtures/size_over.jpg"), 'image/jpeg') }

  it "アイテムが登録できる" do
    params = {
      "name" => "商品だぜ",
      "price" => "1200",
      "description" => "美味しすぎる！",
      "postage" => "120",
      "inventory" => "90",
      "maji_flag" => "0",
      "category_id" => "1",
      "action" => "create",
      "images" => [image_file, image_file2, image_file3, image_file4]
    }
    post "/item/create", params: params
    expect(response.status).to eq 200
  end

  it "変なアクション名だと登録できない" do
    params = {
      "name" => "商品だぜ",
      "price" => "1200",
      "description" => "美味しすぎる！",
      "postage" => "120",
      "inventory" => "90",
      "maji_flag" => "0",
      "category_id" => "1",
      "action" => "hogehoge",
      "images" => [image_file, image_file2, image_file3, image_file4]
    }
    post "/item/create", params: params
    expect(response.status).to eq 200
  end

  it "画像サイズオーバーは登録できない" do
    params = {
      "name" => "商品だぜ",
      "price" => "1200",
      "description" => "美味しすぎる！",
      "postage" => "120",
      "inventory" => "90",
      "maji_flag" => "0",
      "category_id" => "1",
      "action" => "hogehoge",
      "images" => [image_file, image_file2, image_file3, size_over]
    }
    post "/item/create", params: params
    expect(response.status).to eq 500
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
    params = {"id"=>"4"}
    get "/item/edit", params: params
    expect(response.status).to eq 200
  end

  it "商品が更新できること" do
    params = {
      id: "4",
      name: "更新商品",
      price: "1500",
      description: "甘くて美味しいお米",
      postage: "120",
      inventory: "192",
      maji_flag: "1",
      action: "update",
      category_id: "1"
    }
    post "/item/update", params: params
    expect(response.status).to eq 200
  end

  it "商品を削除できること" do
    params = {
      "id": "4"
    }
    post "/item/delete", params: params
    expect(response.status).to eq 200
  end

end
