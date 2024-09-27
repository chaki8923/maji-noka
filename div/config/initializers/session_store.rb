if Rails.env == 'production'
    Rails.application.config.session_store :cookie_store, key: '_api-key',
                                                          domain: 'backend.url',
                                                          same_site: :none,
                                                          secure: true
  else
    Rails.application.config.session_store :cookie_store, key: '_api-key'
  end
  