
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Description do
  let(:description) {"商品説明が入ります"}
  context 'new' do
    it 'インスタンスを生成できる' do
      object, err = Description.new(value: description)
      expect(object.value).to eq description
    end

    it '文字じゃないとエラーになる' do
      _, err = Description.new(value: 123456)
      expect(err).not_to be nil
    end

    it '1文字以上じゃないととエラーになる' do
      _, err = Description.new(value: "")
      expect(err).not_to be nil
    end

  end
end
