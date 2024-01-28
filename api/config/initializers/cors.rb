Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://web-maji:3000' # クライアントのオリジンを設定してください
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
