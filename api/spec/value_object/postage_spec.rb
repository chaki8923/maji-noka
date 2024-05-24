
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Postage do
  let(:postage) {120}
  context 'new' do
    it 'インスタンスを生成できる' do
      object, err = Postage.new(value: postage)
      expect(object.value).to eq postage
    end

    it '数字じゃないとエラーになる' do
      _, err = Postage.new(value: "hoge")
      expect(err).not_to be nil
    end

  end
end
