Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope 'admin_user' do
    get '/new', to: 'admin_user#new'
    post '/login', to: 'admin_user#login'
  end
  get 'mail', to: 'sample_mail#mail'
  get 'mail_comp', to: 'sample_mail#mail_comp'
  post 'mail', to: 'sample_mail#send_mail'
end
