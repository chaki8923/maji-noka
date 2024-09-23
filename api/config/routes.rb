Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope 'admin_user' do
    get '/get_admin_user', to: 'admin_user#get_admin_user'
    post '/signup', to: 'admin_user#signup'
    post '/login', to: 'admin_user#login'
    get '/index', to: 'admin_user#index'
  end

  scope 'item' do
    post '/create', to: 'items#create'
    get '/index', to: 'items#index'
    get '/show/:item_id', to: 'items#show'
    get '/edit', to: 'items#edit'
    post '/update', to: 'items#update'
    post '/delete', to: 'items#delete'
  end

  scope 'schedule' do
    post '/create', to: 'schedules#create'
    get '/index', to: 'schedules#index'
    get '/show/:schedile_id', to: 'schedules#show'
    get '/edit', to: 'schedules#edit'
    post '/update', to: 'schedules#update'
    post '/delete', to: 'schedules#delete'
  end

  scope 'google_api' do
    post '/create', to: 'google_api#create'
    post '/update', to: 'google_api#update'
    get '/find', to: 'google_api#find'
  end

  scope 'categories' do
    get '/index', to: 'categories#index'
  end

  scope 'users' do
    get '/index', to: 'users#index'
  end

  scope 'slider' do
    post '/create', to: 'sliders#create'
    post '/update', to: 'sliders#update'
    get '/index', to: 'sliders#index'
  end

  scope 'mail' do
    post '/send_mail', to: 'send_mail#send_mail'
    post '/bulk_send_mail', to: 'send_mail#bulk_send_mail'
  end

  scope 'purchase' do
    get '/index', to: 'purchase#index'
  end
end
