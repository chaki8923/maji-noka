
# frozen_string_literal: true
require 'rails_helper'
require 'securerandom'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Password do
  let(:password) {BCrypt::Password.create('password')}
  context 'new' do
    it 'インスタンスを生成できる' do
      object, err = Password.new(value: password)
      expect(object.value).to eq password
    end

    it '6文字以上じゃないとエラーになる' do
      _, err = Password.new(value: "12345")
      expect(err).not_to be nil
    end

    it '空だとエラーになる' do
      _, err = Password.new(value: "")
      expect(err).not_to be nil
    end

  end
end
