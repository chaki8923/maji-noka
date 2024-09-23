# frozen_string_literal: true

class GoogleApi < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :id,
                :api_key,
                :user_id,
                :calendar_id


  def create
    res = execute_api('google_api/create', google_api_params, method: 'post')
    convert_boolean(res)
  end

  def update
    res = execute_api('google_api/update', google_api_params, method: 'post')
    convert_boolean(res)
  end


  def find(user_id)
    res = execute_api('google_api/find', {user_id: user_id}, method: 'get')
    ## TODO：あとで消す
    Rails.logger.debug "res---------------------------------#{res}"
    make_data(res)
  end

  private



  def google_api_params
    {
      id: @id,
      user_id: @user_id,
      api_key: @api_key,
      calendar_id: @calendar_id
    }

  end
end
