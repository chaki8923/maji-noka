# frozen_string_literal: true
class SchedulesController < ApplicationController # rubocop:disable Style/Documentation
  after_action :set_csrf_token_header
  def new
    @schedule_instance = Schedule.new
  end

  def create
    @schedule_instance = Schedule.new(schedule_params)
    @schedule_instance = convert_date_format(@schedule_instance)
    res = @schedule_instance.create
    if res == true
      redirect_to index_path, notice: '予定が登録されました'
    else
      render 'admin_user/index'
    end
  end

  def index
    data = Schedule.new
    res = data.index
    render json: res
  end

  def edit

  end

  def update
    @schedule_instance = Schedule.new(schedule_params)
    res = @schedule_instance.update
    if res == true
      redirect_to index_path, notice: "予定が更新されました"
    else
      redirect_to index_path, alert: "エラーで更新されませんでした"
    end

  end

  def delete
    ## TODO：あとで消す
    Rails.logger.debug "params---------------------------------#{params}"
    @schedule_instance = Schedule.new(schedule_params)
    res =  @schedule_instance.delete
    if res.key?('id')
      redirect_to index_path, notice: '予定が削除されました'
    else
      redirect_to index_path, alert: res["err_message"]
    end

  end

  private

  def schedule_params
    params.require(:schedule).permit(
      :id,
      :title,
      :schedule_date,
      :start_time,
      :end_time,
      :memo
    )
  end

  def convert_date_format(schedule_instance)
    schedule_instance.start_time = Time.parse(schedule_instance.start_time)
    schedule_instance.end_time = Time.parse(schedule_instance.end_time)
    schedule_instance.schedule_date = Date.parse(schedule_instance.schedule_date)
    schedule_instance
  end
end
