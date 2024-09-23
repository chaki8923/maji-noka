# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class GoogleApi # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :api_key, :calendar_id

  def initialize(id:, api_key:, user_id:, calendar_id:)
    @id = id
    @api_key = api_key
    @user_id = user_id
    @calendar_id = calendar_id
    @gac = GoogleApiCommand.new
  end

  def self.new(value)
    errors = []

    api_key, err = ApiKey.new(value: value[:api_key])
    errors.push(err) unless api_key

    calendar_id, err = CalendarId.new(value: value[:calendar_id])
    errors.push(err) unless calendar_id
    
    user_id, err = UserId.new(value: value[:user_id])
    errors.push(err) unless user_id

    raise errors.join(', ') unless errors.blank?


    super(
      id: value[:id],
      api_key: api_key,
      user_id: user_id,
      calendar_id: calendar_id,
    )
  end

  def create
    @gac.create_db(
      api_key: @api_key,
      calendar_id: @calendar_id,
      user_id: @user_id
    )
  rescue StandardError => e
    raise e
  end


  def update
    @gac.update_db(
      id: @id,
      api_key: @api_key,
      calendar_id: @calendar_id,
      user_id: @user_id
    )
  rescue StandardError => e
    raise e
  end

  class << self
    def index
      gaq = GoogleApiQuery.new
      gaq.get_all
    end

    def find(user_id)
      gaq = GoogleApiQuery.new
      google_api = gaq.find(user_id)
      google_api = gaq.find(user_id)

      return {} if google_api.nil?
      google_api
    end
  end
end
