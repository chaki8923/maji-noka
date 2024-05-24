
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Name do
  let(:name) {"商品名"}
  context 'new' do
    it 'インスタンスを生成できる' do
      object, err = Name.new(value: name)
      expect(object.value).to eq name
    end

    it '文字じゃないとエラーになる' do
      _, err = Name.new(value: 1111)
      expect(err).not_to be nil
    end

    it '空だとエラーになる' do
      _, err = Name.new(value: nil)
      expect(err).not_to be nil
    end

  end
end
