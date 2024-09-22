# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class GoogleApi # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :api_key, :calendar_id

  def initialize(id:, api_key:, calendar_id:)
    @id = id
    @api_key = api_key
    @calendar_id = calendar_id
    @sdc = ScheduleCommand.new
  end

  def self.new(value)
    errors = []

    api_key, err = ApiKey.new(value: value[:api_key])
    errors.push(err) unless name

    calendar_id, err = CalendarId.new(value: value[:calendar_id])
    errors.push(err) unless start_time


    raise errors.join(', ') unless errors.blank?


    super(
      id: value[:id],
      api_key: api_key,
      calendar_id: calendar_id,
    )
  end

  def create
    @sdc.create_db(
      api_key: @api_key,
      calendar_id: @calendar_id
    )
  rescue StandardError => e
    raise e
  end


  def update
    @sdc.update_db(
      id: @id,
      api_key: @api_key,
      calendar_id: @calendar_id
    )
  rescue StandardError => e
    raise e
  end

  class << self
    def index
      gaq = GoogleApiQuery.new
      gaq.get_all
    end

    def find(id)
      gaq = GoogleApiQuery.new
      google_api = gaq.find(id)

      raise "スケジュール#{SystemMessage::NOTFOUND}" if google_api.nil?
      google_api
    end
  end
end
