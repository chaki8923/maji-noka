# frozen_string_literal: true

require 'faker'
require 'securerandom'
require './api/config/db'
require './api/domain/model/customer/customer'
require './api/domain/model/customer/customer_authorization'
require './api/domain/repository/customer_repository'
require 'support/shared_context'

RSpec.describe CustomerRepository do
  include_context 'test data context'

  context 'find_customer' do
    it '参照できる' do
      customer = cur.find_customer(customer_id: stored_customer.customer_id)
      expect(customer[:customer_id]).to eq stored_customer.customer_id.value
    end
  end

  context 'find_photo_customer' do
    context '正常データを渡す且つ、authorizationが存在する場合' do
      it '参照できる' do
        stored_customer_photo_authorization
        customer = cur.find_photo_customer(customer_id: stored_customer.customer_id)
        expect(customer[:customer_id]).to eq stored_customer.customer_id.value
      end
    end

    context '正常データを渡す且つ、authorizationが存在しない場合' do
      it '参照できない' do
        customer = cur.find_photo_customer(customer_id: stored_customer.customer_id)
        expect(customer).to be_nil
      end
    end
  end

  context 'find_restaurant_customer' do
    it '参照できる' do
      customer =
        cur.find_restaurant_customer(
          restaurant_customer_id: stored_restaurant_customer.restaurant_customer_id
        )
      expect(
        customer[:restaurant_customer_id]
      ).to eq stored_restaurant_customer.restaurant_customer_id.value
    end
  end

  context 'find_customer_by_email' do
    it 'emailでcustomerのレコードを1件取得できる' do
      customer = cur.find_customer_by_email(email: stored_customer.email)
      expect(customer[:customer_id]).to eq stored_customer.customer_id.value
    end
  end

  context 'insert_customer' do
    it 'customersに書き込みが出来る' do
      customer, =
        Customer.create(
          first_name: 'てすと',
          last_name: '太郎',
          first_name_kana: 'てすと',
          last_name_kana: 'たろう',
          email: Faker::Internet.email,
          telno: '00000000000'
        )
      expect(cur.insert_customer(customer:)).to be_integer
    end
  end

  context 'insert_customer_with_authorization' do
    it 'customer_authorizationsに書き込みが出来る' do
      customer, =
        Customer.create(
          first_name: 'てすと',
          last_name: '太郎',
          first_name_kana: 'てすと',
          last_name_kana: 'たろう',
          email: Faker::Internet.email,
          telno: '00000000000'
        )
      customer_authorization, =
        CustomerAuthorization.create(
          customer_id: customer.customer_id.value,
          authorization_item: 'restaurant'
        )
      expect(
        cur.insert_customer_with_authorization(customer:, customer_authorization:)
      ).to be_integer
    end
  end

  context 'insert_customer_with_authorization_and_certification' do
    it 'customer_certificationsに書き込みが出来る' do
      customer, =
        Customer.create(
          first_name: 'てすと',
          last_name: '太郎',
          first_name_kana: 'てすと',
          last_name_kana: 'たろう',
          birthday: '2023-10-10',
          gender: 'man',
          email: Faker::Internet.email,
          telno: '00000000000'
        )
      customer_authorization, =
        CustomerAuthorization.create(
          customer_id: customer.customer_id.value,
          authorization_item: 'ibr_restaurant'
        )

      customer_certification, =
        CustomerCertification.create(
          customer_id: customer.customer_id.value,
          email: customer.email.value,
          password: BCrypt::Password.create('password')
        )
      expect(
        cur.insert_customer_with_authorization_and_certification(
          customer:,
          customer_authorization:,
          customer_certification:
        )
      ).to be_integer
    end
  end

  context 'update_customer_and_insert_certification' do
    it 'customer をupdateしてcustomer_certificationsに書き込みが出来る' do
      customer = stored_customer

      customer_certification, =
        CustomerCertification.create(
          customer_id: customer.customer_id.value,
          email: customer.email.value,
          password: BCrypt::Password.create('password')
        )
      expect(
        cur.update_customer_and_insert_certification(customer:, customer_certification:)
      ).to be_integer
    end
  end

  context 'update_customer_with_authorization' do
    it 'customerをupdateしてcustomer_authorizationsに書き込みが出来る' do
      customer_authorization, =
        CustomerAuthorization.create(
          customer_id: stored_customer.customer_id.value,
          authorization_item: 'restaurant'
        )
      expect(
        cur.update_customer_with_authorization(customer: stored_customer, customer_authorization:)
      ).to be_integer
    end
  end

  context 'insert_customer_authorization' do
    it 'customer_authorizationsに書き込みが出来る' do
      customer_authorization, =
        CustomerAuthorization.create(
          customer_id: stored_customer.customer_id.value,
          authorization_item: 'restaurant'
        )
      expect(cur.insert_customer_authorization(customer_authorization:)).to be_integer
    end
  end

  context 'find_customer_authorization_by_customer_id_and_item' do
    it 'customer_authorizationを１件取得できる' do
      customer_authorization =
        cur.find_customer_authorization_by_customer_id_and_item(
          customer_authorization: stored_customer_authorization
        )
      expect(
        customer_authorization[:customer_authorization_id]
      ).to eq stored_customer_authorization.customer_authorization_id.value
    end
  end

  context 'update_customer' do
    it 'customer情報を更新できる' do
      customer, =
        Customer.new(
          customer_id: stored_customer.customer_id.value,
          first_name: stored_customer.name.first_name,
          last_name: stored_customer.name.last_name,
          first_name_kana: stored_customer.name.first_name_kana,
          last_name_kana: stored_customer.name.last_name_kana,
          email: stored_customer.email.value,
          telno: stored_customer.telno.value
        )
      expect(cur.update_customer(customer:)).to be_integer
    end
  end

  context 'delete_customer' do
    it 'customerを削除できる' do
      expect(cur.delete_customer(customer_id: stored_customer.customer_id)).to be_integer
    end
  end

  context 'delete restaurant customer' do
    it 'restaurant_customer と certificationを削除できる' do
      expect(
        cur.delete_restaurant_customer_with_certification(
          restaurant_customer_id: stored_restaurant_customer.restaurant_customer_id
        )
      ).to be_integer
    end
  end

  context 'update_restaurant_customer_email_with_certification' do
    it 'restaurant customer情報を更新できる' do
      stored_customer_certification
      restaurant_customer_id = stored_restaurant_customer.restaurant_customer_id
      after_email = Email.new(value: Faker::Internet.email)
      expect(
        cur.update_restaurant_customer_email_with_certification(
          restaurant_customer_id:,
          after_email:
        )
      ).to be_integer
    end
  end

  context 'restaurant_customer_one_time_pass' do
    context 'find_restaurant_customer_one_time_pass' do
      it 'one_time_passを登録出来る' do
        result =
          cur.insert_restaurant_customer_one_time_pass_for_change_emails(
            restaurant_customer_one_time_pass: created_restaurant_customer_one_time_pass,
            email: stored_restaurant_customer.email
          )
        expect(result).to be_integer
      end
    end

    context 'restaurant_customer_alert_for_insert' do
      it '送信できる' do
        email = stored_restaurant_customer.email
        name = stored_restaurant_customer.name
        result = cur.restaurant_customer_alert_for_insert(email:, name:)
        expect(result).to eq true
      end
    end
  end
end
