require 'sequel'
module QueryService
  class GoogleApiQuery
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
    def get_all
      DB[:google_api].all
    end
  
    def find(user_id)
      DB[:google_api].where(:user_id => user_id).first
    end
  end
end
