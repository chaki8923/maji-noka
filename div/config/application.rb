require_relative "boot"

require "rails/all"


# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Div
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # この行を追加してDB接続を無効化
    config.active_record.migration_error = :app_startup

    # データベース接続を無効にする
    config.active_record.dump_schema_after_migration = false

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    # active_recordの使用を無効にする
    config.api_only = true
    config.active_record.default_timezone = :local
    # ActionDispatch::Request::Session::DisabledSessionError対策
    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use config.session_store, config.session_options
    
    # 以下の行を追加してDBに接続しないようにする
    # config.active_record.raise_in_transactional_callbacks = false
    # config.x.base_url = config_for(:base_url).symbolize_keys
  end
end
