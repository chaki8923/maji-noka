# frozen_string_literal: true
require 'rails_helper'
require 'faker'

RSpec.describe AdminUsers do
  let(:email) { Faker::Internet.email }
  let(:password) { BCrypt::Password.create('password') }

  let(:admin_user) do
    admin_user, _ =
      AdminUsers.new(email:, password:)
    return admin_user
  end

  context 'email.value' do
    it 'emailが参照出来る' do
      expect(admin_user.email.value).to eq email
    end
  end
end
