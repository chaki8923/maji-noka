# frozen_string_literal: true

class GoogleApi < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :id,
                :api_key,
                :calendar_id


  def create
    res = execute_api('google_api/create', google_api_params, method: 'post')
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

  private

  def google_api_params
    {
      id: @id,
      api_key: @api_key,
      calendar_id: @calendar_id
    }

  end
end
