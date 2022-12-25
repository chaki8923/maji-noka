require 'sequel'

class AdminQuery
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def get_hash_password(params)
    res = DB[:admin_users]
    .select(:password)
    .where(
      :email => params[:email]
    ).first

    res
  end

  def check_mail(email)
    res = DB[:admin_users]
    .select(:id)
    .where(:email => email)
    .first

    res
  end

  def get_admin_user(email)
    res = DB[:admin_users]
    .where(:email => email)
    .first

    res
  end
end