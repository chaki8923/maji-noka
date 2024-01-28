Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope 'admin_user' do
    get '/new', to: 'admin_user#new', as: 'admin_new'
    post '/signup', to: 'admin_user#signup'
    get '/login', to: 'auth#new'
    post '/login', to: 'auth#login'
    get '/index', to: 'admin_user#index'
    delete '/logout', to: 'admin_user#logout'
  end

  scope 'item' do
    get '/new', to: 'item#new'
    post '/create', to: 'item#create'
    get '/index', to: 'item#index'
    get '/edit/:id', to: 'item#edit'
    post '/update', to: 'item#update'
  end

  scope 'customer' do
    get '/index', to: 'customer#index'
  end

  get 'mail', to: 'sample_mail#mail'
  get 'mail_comp', to: 'sample_mail#mail_comp'
  post 'mail', to: 'sample_mail#send_mail'

  scope 'calendar' do
    get '/get', to: 'admin_user#get_calender'
  end
end
