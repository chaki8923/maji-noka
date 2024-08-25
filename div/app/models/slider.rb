# frozen_string_literal: true

class Slider < BaseModel # rubocop:disable Style/Documentation



  def create(params)
    Rails.logger.debug "params---------------------------------#{params}"
    res = execute_api('slider/create', params, method: 'post')
    convert_boolean(res)
  end

  def update(params)
    ## TODO:Chakiあとで消す
    res = execute_api('slider/update', params, method: 'post')
    convert_boolean(res)
  end

  def index
    res = execute_api('slider/index', method: 'get')
    res
  end

end
