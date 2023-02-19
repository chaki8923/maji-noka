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
  scope 'admin_user' do
    get '/get_admin_user', to: 'admin_user#get_admin_user'
    post '/signup', to: 'admin_user#signup'
    post '/login', to: 'admin_user#login'
    get '/index', to: 'admin_user#index'
  end

  scope 'item' do
    post '/create', to: 'item#create'
    get '/index', to: 'item#index'
    get '/edit', to: 'item#edit'
    post '/update', to: 'item#update'
    post '/delete', to: 'item#delete'
  end
end
