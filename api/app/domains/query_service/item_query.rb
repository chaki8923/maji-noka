require 'sequel'
module QueryService
  class ItemQuery
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
    def get_all
      DB[:items].all
    end
  
    def find(id)
      DB[:items].where(:id => id).first
    end
  end
end