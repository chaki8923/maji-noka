# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Schedule # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :title, :schedule_date, :start_time, :end_time, :memo

  def initialize(id:, title:, schedule_date:, start_time:, end_time:, memo:)
    @id = id
    @title = title
    @schedule_date = schedule_date
    @start_time = start_time
    @end_time = end_time
    @memo = memo
    @sdc = ScheduleCommand.new
  end

  def self.new(value)
    errors = []

    title, err = TextFormat.new(value: value[:title])
    errors.push(err) unless name

    start_time, err = TimeFormat.new(value: Time.parse(value[:start_time]))
    errors.push(err) unless start_time

    end_time, err = TimeFormat.new(value: Time.parse(value[:end_time]))
    errors.push(err) unless end_time

    schedule_date, err = DateFormat.new(value: Date.parse(value[:schedule_date]))
    errors.push(err) unless schedule_date

    memo, err = TextFormat.new(value: value[:memo])

    errors.push('日付範囲が不正') if start_time.value > end_time.value
    errors.push(err) unless memo

    raise errors.join(', ') unless errors.blank?


    super(
      id: value[:id],
      title: title,
      start_time: start_time,
      end_time: end_time,
      schedule_date: schedule_date,
      memo: memo,
    )
  end

  def create(params)
    @sdc.create_db(params)
  rescue StandardError => e
    raise e
  end

  def update(params)
    @sdc.update_db(params)
  rescue StandardError => e
    raise e
  end


  class << self
    def index
      sdq = ScheduleQuery.new
      sdq.get_all
    end

    def find(id)
      sdq = ScheduleQuery.new
      schedule = sdq.find(id)

      raise "スケジュール#{SystemMessage::NOTFOUND}" if schedule.nil?
      item
    end

    def delete(id)
      sdc = ScheduleCommand.new
      sdc.delete_db(id)
    rescue StandardError => e
      raise e
    end
  end
end
