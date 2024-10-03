# frozen_string_literal: true

require 'sequel'
module CommandService
  class ScheduleCommand # rubocop:disable Style/Documentation
    DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  
     # 新規作成
     def create_db(title:, schedule_date:, start_time:, end_time:, memo:)
      DB[:schedules]
        .returning(:id)
        .insert(
          title: title.value,
          schedule_date: schedule_date.value,
          start_time: start_time.value,
          end_time: end_time.value,
          memo: memo.value,
          updated_at: 'NOW()',
          created_at: 'NOW()'
        )
    end
  
    def update_db(id:, title:, schedule_date:, start_time:, end_time:, memo:)
      DB[:schedules]
        .returning(:id)
        .where(id: id)
        .update(
          title: title.value,
          schedule_date: schedule_date.value,
          start_time: start_time.value,
          end_time: end_time.value,
          memo: memo.value,
          updated_at: "NOW()",
          created_at: "NOW()"
        )
    end
  
    def delete_db(id:)
      ## TODO：あとで消す
      Rails.logger.debug "削除id---------------------------------#{id}"
      DB[:schedules]
        .returning(:id)
        .where(:id => id)
        .delete
    end
  end
end
