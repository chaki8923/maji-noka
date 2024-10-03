require 'sequel'
module QueryService
  class SliderQuery
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
    def get_all
      DB[:sliders].all
    end
  
    def find(id)
      DB[:sliders].where(:id => id).first
    end
  end
end
