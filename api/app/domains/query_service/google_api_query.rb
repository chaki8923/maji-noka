require 'sequel'

class GoogleApiQuery
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def get_all
    DB[:google_api].all
  end

  def find(id)
    DB[:google_api].where(:id => id).first
  end
end
