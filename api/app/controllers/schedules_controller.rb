# frozen_string_literal: true

class SchedulesController < ApplicationController # rubocop:disable Style/Documentation
  def create
    convert_params = format_date(schedule_params)
    schedule = Schedule.new(convert_params)
    schedule.create(schedule)
    render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
  rescue => err_message
    render json: {
             value: nil,
             err_message: err_message
           },
           status: :internal_server_error
  end

  def update
    convert_params = format_date(schedule_params)
    schedule = Schedule.new(convert_params)
    res = schedule.update(schedule)
    render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
  rescue => err_message
    render json: {
             value: nil,
             err_message: err_message
           },
           status: :internal_server_error
  end

  def index
    res = Schedule.index
    render json: res
  end

  def delete
    delete_schedule = Schedule.find(params["id"])
    res = Schedule.delete(delete_schedule[:id])
    render json: res[0]
  rescue => err_message
    render json: {
             value: nil,
             err_message: err_message
           },
           status: :internal_server_error
  end

  private

  def schedule_params
    params.permit(:id, :title, :start_time, :end_time, :schedule_date, :memo)
  end

  def format_date(schedule_params)
    # DateTimeオブジェクトに変換
    schedule_date = DateTime.parse(schedule_params[:schedule_date])
    schedule_start_time = DateTime.parse(schedule_params[:start_time])
    schedule_end_time = DateTime.parse(schedule_params[:end_time])

    # 年月日の部分と時間の部分を取得
    year_month_day = schedule_date.strftime("%Y-%m-%d")
    only_start_time = schedule_start_time.strftime("%H:%M:%S")
    only_end_time = schedule_end_time.strftime("%H:%M:%S")

    # 年月日と時間を結合して新しい日時データを作成
    new_start_datetime = "#{year_month_day}T#{only_start_time}"
    new_end_datetime = "#{year_month_day}T#{only_end_time}"
    schedule_params[:start_time] = new_start_datetime
    schedule_params[:end_time] = new_end_datetime
    ## TODO:Chakiあとで消す
    Rails.logger.debug "schedule_params---------------------------------#{schedule_params}"
    schedule_params
  end
end
