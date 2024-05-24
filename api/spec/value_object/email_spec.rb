# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Email do
  let(:email) { 'hogehoge@gmail.com' }

  context 'new' do
    it 'インスタンスを生成できる' do
      mail_object, err = Email.new(value: email)
      expect(mail_object.value).to eq email
    end

    it 'emailが文字列じゃないとエラーになる' do
      _, err = Email.new(value: 1_111_111)
      expect(err).not_to be nil
    end

    it 'emailがメールの形式じゃないとエラーになる' do
      _, err = Email.new(value: "cahkichaki@net")
      expect(err).not_to be nil
    end

    it 'emailに「@」がないとエラーになる' do
      _, err = Email.new(value: "cahkichaki.net")
      expect(err).not_to be nil
    end

    it 'emailは一意じゃないとエラーになる' do
      _, err = Email.new(value: "fugafuga2@gmail.com")
      expect(err).not_to be nil
    end

  end
end
