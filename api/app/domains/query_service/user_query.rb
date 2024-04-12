require 'sequel'

class UserQuery
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def get_all
    DB[:User].all
  end

  def find(id)
    DB[:User].where(:id => id).first
  end
end
