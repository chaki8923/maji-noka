# frozen_string_literal: true

require 'faker'
require './api/domain/model/value_object/address'

RSpec.describe Address do
  let(:zip) { '1234567' }
  let(:prefecture) { '東京都' }
  let(:city) { '世田谷区〇〇町' }
  let(:street) { '1-1-1' }
  let(:building) { 'ほにゃららビル' }
  context 'new' do
    it 'インスタンスを生成できる' do
      address, = Address.new(zip:, prefecture:, city:, street:, building:)
      expect(address.zip).to eq zip
      expect(address.prefecture).to eq prefecture
      expect(address.city).to eq city
      expect(address.street).to eq street
      expect(address.building).to eq building
    end

    it 'zipが文字列じゃないとエラーになる' do
      _, err = Address.new(zip: 1_111_111, prefecture:, city:, street:, building:)
      expect(err).not_to be nil
    end

    it 'zipの形式が違うとエラーになる' do
      _, err = Address.new(zip: '111', prefecture:, city:, street:, building:)
      expect(err).not_to be nil
    end

    it 'prefectureがないとエラーになる' do
      _, err = Address.new(zip:, prefecture: '', city:, street:, building:)
      expect(err).not_to be nil
    end

    it 'prefectureが文字列じゃないとエラーになる' do
      _, err = Address.new(zip:, prefecture: 1, city:, street:, building:)
      expect(err).not_to be nil
    end

    it 'cityがないとエラーになる' do
      _, err = Address.new(zip:, prefecture:, city: '', street:, building:)
      expect(err).not_to be nil
    end

    it 'cityが文字列じゃないとエラーになる' do
      _, err = Address.new(zip:, prefecture:, city: 1, street:, building:)
      expect(err).not_to be nil
    end

    it 'streetがないとエラーになる' do
      _, err = Address.new(zip:, prefecture:, city:, street: '', building:)
      expect(err).not_to be nil
    end

    it 'streetが文字列じゃないとエラーになる' do
      _, err = Address.new(zip:, prefecture:, city:, street: 1, building:)
      expect(err).not_to be nil
    end
  end
end
