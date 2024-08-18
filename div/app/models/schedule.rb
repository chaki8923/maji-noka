# frozen_string_literal: true

class Schedule < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :id,
                :title,
                :schedule_date,
                :start_time,
                :price,
                :end_time,
                :memo

  def create
    res = execute_api('schedule/create', schedule_params, method: 'post')
    convert_boolean(res)
  end

  def update
    res = execute_api('schedule/update', schedule_params, method: 'post')
    convert_boolean(res)
  end

  def index
    res = execute_api('schedule/index', method: 'get')
    make_list(res)
  end

  def edit(params)
    res = execute_api('schedule/edit', params, method: 'get')
    make_data(res)
  end

  def delete # rubocop:disable Lint/DuplicateMethods
    ## TODO：あとで消す
    Rails.logger.debug "@id---------------------------------#{@id}"
    execute_api('schedule/delete', {id: @id}, method: 'post')
  end

  private

  def schedule_params
    {
      id: @id,
      title: @title,
      start_time: @start_time,
      end_time: @end_time,
      memo: @memo,
      schedule_date: @schedule_date
    }
  end
end
