require 'sequel'

class ItemQuery
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def get_all
    DB[:item].all
  end

  def find(id)
    DB[:item].where(:id => id).first
  end
end