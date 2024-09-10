# frozen_string_literal: true
require 'rails_helper'
require 'faker'

RSpec.describe AdminUsers do

# 画像データを作成するヘルパーメソッド
  let(:image_file) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image1.jpg"), 'image/jpeg') }
  let(:image_file2) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image2.jpg"), 'image/jpeg') }
  let(:image_file3) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image3.jpg"), 'image/jpeg') }
  let(:image_file4) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image4.jpg"), 'image/jpeg') }
  let(:name) { "テスト商品名" }
  let(:price) { 1300 }
  let(:description) { "商品説明" }
  let(:postage) { 120 }
  let(:inventory) { 50 }
  let(:maji_flag) { 0 }

  let(:action) { "create" }

  let(:item) do
    params = {
      name: name,
      price:  price,
      description: description,
      postage: postage,
      inventory: inventory,
      maji_flag: maji_flag,
      action: action,
      'images' => [image_file, image_file2, image_file3, image_file4]
    }
    item, _ =
      Item.new(params)
    return item
  end

  context 'name.value' do
    it '商品名が参照出来る' do
      expect(item.name.value).to eq name
    end
  end

  context 'price.value' do
    it '料金が参照出来る' do
      expect(item.price.value).to eq price
    end
  end

  context 'description.value' do
    it '商品説明が参照出来る' do
      expect(item.description.value).to eq description
    end
  end

  context 'postage.value' do
    it '送料が参照出来る' do
      expect(item.postage.value).to eq postage
    end
  end

  context 'inventory.value' do
    it '在庫が参照出来る' do
      expect(item.inventory.value).to eq inventory
    end
  end

  context 'maji_flag.value' do
    it 'マジフラグが参照出来る' do
      expect(item.maji_flag.value).to eq false
    end
  end

  context 'category_id.value' do
    it 'カテゴリーidが参照出来る' do
      expect(item.category_id.value).to eq category_id
    end
  end

  context 'images.value' do
    it '画像が参照出来る' do
      expect(item.images.value[0]).to eq image_file
    end
  end


end
