require 'sequel'

class ItemQuery
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def get_all
    res = DB[:item]
    .all

    res
  end
end