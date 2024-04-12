Dotenv.load
require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'maji-image' # バケット名
    config.fog_public = false
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id:  ENV.fetch('ACCESS_KEY_ID', nil), # アクセスキー
      aws_secret_access_key: ENV.fetch('SECRET_ACCESS_KEY', nil), # シークレットアクセスキー
      region: 'ap-northeast-1', # リージョン
      path_style: true
    }
end
