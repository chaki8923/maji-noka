# frozen_string_literal: true
class GoogleApiController < ApplicationController # rubocop:disable Style/Documentation

  def create
    @google_api = GoogleApi.new(google_api_params)
    res = @google_api.create
    if res == true
      redirect_to index_path, notice: 'APIが登録されました'
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
    @google_api_instance = GoogleApi.new(google_api_params)
    res = @google_api_instance.update
    if res == true
      redirect_to index_path, notice: "予定が更新されました"
    else
      redirect_to index_path, alert: "エラーで更新されませんでした"
    end

  end

  def delete
    @schedule_instance = Schedule.new(schedule_params)
    res =  @schedule_instance.delete
    if res.key?('id')
      redirect_to index_path, notice: '予定が削除されました'
    else
      redirect_to index_path, alert: res["err_message"]
    end

  end

  private

  def google_api_params
    params.require(:google_api).permit(
      :id,
      :api_key,
      :calendar_id
    )
  end
end
