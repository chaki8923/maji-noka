# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'admin_user#new'

  scope 'admin_user' do
    get '/new', to: 'admin_user#new', as: 'admin_new'
    post '/signup', to: 'admin_user#signup'
    get '/login', to: 'auth#new'
    post '/login', to: 'auth#login'
    get '/index', to: 'admin_user#index'
    delete '/logout', to: 'admin_user#logout'
  end

  scope 'item' do
    get '/new', to: 'items#new'
    post '/create', to: 'items#create'
    get '/index', to: 'items#index', as: 'item_index'
    get '/edit/:id', to: 'items#edit'
    post '/update', to: 'items#update'
    delete '/delete/:id', to: 'items#delete', as: 'delete_item'
  end

  scope 'customer' do
    get '/index', to: 'customers#index'
  end

  get 'mail', to: 'sample_mail#mail'
  get 'mail_comp', to: 'sample_mail#mail_comp'
  post 'mail', to: 'sample_mail#send_mail'

  scope 'calendar' do
    get '/get', to: 'admin_user#get_calender'
  end
end
