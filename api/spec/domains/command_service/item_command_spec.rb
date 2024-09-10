# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }

RSpec.describe ItemCommand do
  # 画像データを作成するヘルパーメソッド

  let(:ics) {ItemCommand.new}
  let(:image_file) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image1.jpg"), 'image/jpeg') }
  let(:image_file2) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image2.jpg"), 'image/jpeg') }
  let(:image_file3) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image3.jpg"), 'image/jpeg') }
  let(:image_file4) { fixture_file_upload(Rails.root.join("spec/fixtures/test_image4.jpg"), 'image/jpeg') }
  let(:name) { "commandテスト商品名" }
  let(:price) { 1300 }
  let(:description) { "商品説明" }
  let(:postage) { 120 }
  let(:inventory) { 50 }
  let(:maji_flag) { 0 }
  let(:create_action) { "create" }
  let(:update_action) { "update" }

  let(:create_item) do
    params = {
      name: name,
      price:  price,
      description: description,
      postage: postage,
      inventory: inventory,
      maji_flag: maji_flag,
      action: create_action,
      'images' => [image_file, image_file2, image_file3, image_file4]
    }
    item, _ =
      Item.new(params)
    return item
  end

  let(:update_item) do
    params = {
      name: "更新テスト商品",
      price:  price,
      description: description,
      postage: postage,
      inventory: inventory,
      maji_flag: maji_flag,
      action: update_action,
      'images' => [image_file, image_file2, image_file3, image_file4]
    }
    item, _ =
      Item.new(params)
    return item
  end

  context 'insert_item' do
    it 'itemに書き込みが出来る' do

      expect(ics.create_db(
        name: create_item.name,
        price: create_item.price,
        description: create_item.description,
        postage: create_item.postage,
        inventory: create_item.inventory,
        maji_flag: create_item.maji_flag,
        action: create_item.action,
        images: create_item.images
        ).first[:id]).to be_integer
    end
  end

  context 'update_item' do
    it 'itemを更新できる' do
      expect(ics.update_db(
        id: 9,
        name: update_item.name,
        price: update_item.price,
        description: update_item.description,
        postage: update_item.postage,
        inventory: update_item.inventory,
        maji_flag: update_item.maji_flag,
        images: update_item.images
        ).first[:id]).to be_integer
    end
  end

  context 'delete_item' do
    it 'itemを削除できる' do
      expect(ics.delete_db(
        id: 9
        ).first[:id]).to be_integer
    end
  end

  context 'update_image_count' do
    it 'itemを削除できる' do
      expect(ics.update_image_count(8, 4)).to 200
    end
  end
end
