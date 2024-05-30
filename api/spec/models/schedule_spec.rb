# frozen_string_literal: true
require 'rails_helper'
require 'faker'

RSpec.describe Schedule do


  let(:id) { "1" }
  let(:title) { "米を届ける" }
  let(:start_time) { "2024-05-21 14:43:00 +0000" }
  let(:end_time) { "2024-05-21 14:47:00 +0000" }
  let(:memo) { "米を佐藤さんちに届ける" }
  let(:schedule_date) { "2024-05-22" }

  let(:schedule) do
    params = {
      id: id,
      title: title,
      start_time: start_time,
      end_time: end_time,
      memo: memo,
      schedule_date: schedule_date
    }
    schedule, _ =
    Schedule.new(params)
    return schedule
  end

  context 'id.value' do
    it 'idが参照出来る' do
      expect(schedule.id).to eq id
    end
  end

end
