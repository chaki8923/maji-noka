# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }

RSpec.describe AdminCommand do
  let(:ics) {ItemCommand.new}
  let(:email) { Faker::Internet.email }
  let(:password) { BCrypt::Password.create('password') }
  let(:admin_user) do
    params = {email: Faker::Internet.email, password: password}
    admin_user, _ =
      AdminUsers.new(params)
    return admin_user
  end

  context 'insert_admin_user' do
    it 'admin_userに書き込みが出来る' do
      p "admin_user--------------------#{admin_user}"
      expect(ads.create_db(admin_user)).to be_integer
    end
  end

  end
end
