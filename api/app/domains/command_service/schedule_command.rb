# frozen_string_literal: true

require 'sequel'

class ScheduleCommand # rubocop:disable Style/Documentation
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  # 新規作成
  def create_db(schedule)
    DB[:schedules]
      .returning(:id)
      .insert(
        title: schedule.title.value,
        start_time: schedule.start_time.value,
        end_time: schedule.end_time.value,
        schedule_date: schedule.schedule_date.value,
        memo: schedule.memo.value,
        updated_at: 'NOW()',
        created_at: 'NOW()'
      )
  end

  def update_db(schedule)
    DB[:schedules]
      .returning(:id)
      .where(
        id: schedule.id
      )
      .update(update_params(schedule))
  end

  def delete_db(id)
    ## TODO：あとで消す
    Rails.logger.debug "削除id---------------------------------#{id}"
    DB[:schedules]
      .returning(:id)
      .where(:id => id)
      .delete
  end

  private

  def update_params(schedule)
    {
      title: schedule.title.value,
      schedule_date: schedule.schedule_date.value,
      start_time: schedule.start_time.value,
      end_time: schedule.end_time.value,
      memo: schedule.memo.value,
      updated_at: 'NOW()',
      created_at: 'NOW()'
    }
  end
end
