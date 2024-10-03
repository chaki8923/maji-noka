require 'sequel'
module QueryService
  class UserQuery
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
    def get_all
      DB[:Customer].all
    end
  
    def find(id)
      DB[:Customer].where(:id => id).first
    end
  end
end
