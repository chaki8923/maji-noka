require 'sequel'
module QueryService
  class CategoryQuery
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
    def get_all
      DB[:category].all
    end
  
  end
end

