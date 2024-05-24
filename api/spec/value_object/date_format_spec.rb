
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe DateFormat do
  let(:date) {Date.parse('2024-05-23')}

  context 'new' do
    it 'インスタンスを生成できる' do
      date_object, err = DateFormat.new(value: date)
      expect(date_object.value).to eq date
    end

    it 'Date型じゃないとエラーになる' do
      _, err = DateFormat.new(value: "2024-01-01")
      expect(err).not_to be nil
    end

  end
end
