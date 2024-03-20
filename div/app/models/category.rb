# frozen_string_literal: true

class Category < BaseModel # rubocop:disable Style/Documentation
  attr_accessor :id,
                :name

  def index
    res = execute_api('categories/index', method: 'get')
    ## TODO：あとで消す
    Rails.logger.debug "res---------------------------------#{res}"
    make_list(res)
  end
end
