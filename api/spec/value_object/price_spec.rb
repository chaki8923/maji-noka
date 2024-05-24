
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Price do
  let(:price) {120}
  context 'new' do
    it 'インスタンスを生成できる' do
      object, err = Price.new(value: price)
      expect(object.value).to eq price
    end

    it '空はエラーになる' do
      _, err = Price.new(value: nil)
      expect(err).not_to be nil
    end

    it '数字じゃないとエラーになる' do
      _, err = Price.new(value: "hoge")
      expect(err).not_to be nil
    end

    it '50円未満はエラーになる' do
      _, err = Price.new(value: "hoge")
      expect(err).not_to be nil
    end

  end
end
