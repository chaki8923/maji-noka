require 'sequel'
module QueryService
  class ScheduleQuery
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
    def get_all
      DB[:schedules].all
    end
  
    def find(id)
      DB[:schedules].where(:id => id).first
    end
  end
end

