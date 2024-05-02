require 'rails_helper'
require 'faker'
require 'securerandom'

RSpec.describe AdminUserController, type: :controller  do

  # 初回のみFakerに直したい。登録されてたら登録しない
  # admin_user_params = {email: "fugafuga2@gmail.com", password: "123456"}
  # admin_user, err_message = AdminUsers.new(admin_user_params)
  # admin_user.create(admin_user)

  context 'SignUpのテスト' do
   it '登録できること' do
    # admin_user_params = {email: Faker::Internet.email, password: BCrypt::Password.create('password')}
    # admin_user, err_message = AdminUsers.new(admin_user_params)
    # expect(admin_user.create(admin_user)).to be_integer
   end

   it 'パスワードが6桁未満は登録できないこと' do
    admin_user_params = {email: Faker::Internet.email, password: '1234'}
    admin_user, err_message = AdminUsers.new(admin_user_params)

    expect(err_message).to be_present
   end

   it '同じemailは登録できないこと' do
    admin_user_params = {email: "fugafuga2@gmail.com", password: BCrypt::Password.create('password')}
    admin_user, err_message = AdminUsers.new(admin_user_params)

    expect(err_message).to be_present
   end
  end

  context "ログインのテスト" do
    it "ログインできる事" do
      admin_user_params = {email: "fugafuga2@gmail.com", password: '123456'}
      auth = Auth.new
      _, err_message = auth.check(admin_user_params)
      expect(err_message).to_not be_present
    end

    it "emailが違うとログインできない事" do
      admin_user_params = {email: "fugafuga222@gmail.com", password: '123456'}
      auth = Auth.new
      _, err_message = auth.check(admin_user_params)
      expect(err_message).to be_present
    end

    it "パスワードが違うとログインできない事" do
      admin_user_params = {email: "fugafuga2@gmail.com", password: '1234567'}
      auth = Auth.new
      _, err_message = auth.check(admin_user_params)
      expect(err_message).to be_present
    end
  end
end
