# frozen_string_literal: true

require 'faker'
require './api/domain/model/customer/customer'

RSpec.describe Customer do
  let(:name) { Faker::Name.name }
  let(:email) { Faker::Internet.email }
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:first_name_kana) { 'みょうじ' }
  let(:last_name_kana) { 'なまえ' }
  let(:telno) { '00000000000' }

  let(:customer) do
    customer, =
      Customer.create(first_name:, last_name:, first_name_kana:, last_name_kana:, email:, telno:)
    return customer
  end

  context 'customer_id.value' do
    it 'customer_idが参照できる' do
      expect(customer.customer_id.value).to match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      )
    end
  end

  context 'email.value' do
    it 'emailが参照出来る' do
      expect(customer.email.value).to eq email
    end
  end

  context 'name' do
    it 'first_nameが参照できる' do
      expect(customer.name.first_name).to eq first_name
    end

    it 'last_nameが参照できる' do
      expect(customer.name.last_name).to eq last_name
    end

    it 'first_name_kanaが参照できる' do
      expect(customer.name.first_name_kana).to eq first_name_kana
    end

    it 'last_name_kanaが参照できる' do
      expect(customer.name.last_name_kana).to eq last_name_kana
    end
  end

  context 'telno.value' do
    it 'telnoが参照できる' do
      expect(customer.telno.value).to eq telno
    end
  end
end
