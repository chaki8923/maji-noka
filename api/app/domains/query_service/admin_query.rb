# frozen_string_literal: true

require 'sequel'

class AdminQuery # rubocop:disable Style/Documentation
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def get_hash_password(params)
    DB[:admin_users]
      .select(:password)
      .where(
        email: params[:email]
      ).first
  end

  def check_mail(email)
    DB[:admin_users]
      .select(:id)
      .where(email: email)
      .first
  end

  def get_admin_user(email)
    DB[:admin_users]
      .select(:id, :email, :password)
      .where(email: email)
      .first
  end
end
