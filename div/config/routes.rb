Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope 'admin_user' do
    get '/new', to: 'admin_user#new'
    post '/signup', to: 'admin_user#signup'
    get '/login', to: 'auth#new'
    post '/login', to: 'auth#login'
    get '/index', to: 'admin_user#index'
  end

  scope 'item' do
    get '/new', to: 'item#new'
    post '/create', to: 'item#create'
    get '/index', to: 'item#index'
  end



  get 'mail', to: 'sample_mail#mail'
  get 'mail_comp', to: 'sample_mail#mail_comp'
  post 'mail', to: 'sample_mail#send_mail'

  scope 'calendar' do
    get '/get', to: 'admin_user#get_calender'

  end
end
