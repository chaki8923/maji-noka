
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe TimeFormat do

  let(:time) {Time.parse("2024-05-24 13:48:00 +0000")}
  context 'new' do
    it 'インスタンスを生成できる' do
      
      object, err = TimeFormat.new(value: time)
      expect(object.value).to eq time
    end


    it '文字列はエラーになる' do
      _, err = TimeFormat.new(value: "hogehoge")
      expect(err).not_to be nil
    end

    it '数字はエラーになる' do
      _, err = TimeFormat.new(value: 123445)
      expect(err).not_to be nil
    end

  end
end
