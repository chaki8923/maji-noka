require 'rails_helper'
require 'faker'
require 'securerandom'


RSpec.describe AdminUserController, type: :request  do

  # 初回のみFakerに直したい。登録されてたら登録しない
  # admin_user_params = {email: "fugafuga2@gmail.com", password: "123456"}
  # admin_user, err_message = AdminUsers.new(admin_user_params)
  # admin_user.create(admin_user)

  # it '登録できること' do
  #   admin_user_params = {email: Faker::Internet.email, password: BCrypt::Password.create('password')}
  #   admin_user, err_message = AdminUsers.new(admin_user_params)
  #   expect(admin_user.create(admin_user)).to be_integer
  # end

  it 'パスワードが6桁未満は登録できないこと' do
    params = {email: Faker::Internet.email, password: '1234'}

    post "/admin_user/login/", params: params
    expect(response.status).to eq 500
  end

  it '同じemailは登録できないこと' do
    params = {email: "fugafuga2@gmail.com", password: BCrypt::Password.create('password')}
    post "/admin_user/signup", params: params

    expect(response.status).to eq 500
  end

  it "ログインできること" do
    params = { email: "fugafuga2@gmail.com", password: "123456" }
    post "/admin_user/login", params: params
    expect(response.status).to eq 200
  end

  it "emailが違うとログインできない事" do
    params = {email: "fugafuga222@gmail.com", password: '123456'}
    post "/admin_user/login", params: params
    expect(response.status).to eq 200
  end

  it "パスワードが違うとログインできない事" do
    params = {email: "fugafuga2@gmail.com", password: '1234567'}
    post "/admin_user/login", params: params
    expect(response.status).to eq 200
  end


end
