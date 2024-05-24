
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Inventory do
  let(:inventory) {10}
  context 'new' do
    it 'インスタンスを生成できる' do
      object, err = Inventory.new(value: inventory)
      expect(object.value).to eq inventory
    end

    it '数字じゃないとエラーになる' do
      _, err = Inventory.new(value: "hoge")
      p "err---------------------#{err}"
      expect(err).not_to be nil
    end

  end
end
