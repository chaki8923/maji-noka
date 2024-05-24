
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe Action do
  let(:action1) { 'create' }
  let(:action2) { 'update' }

  context 'new' do
    it 'インスタンスを生成できる' do
      action_object, err = Action.new(value: action1)
      expect(action_object.value).to eq action1
    end

    it 'インスタンスを生成できる' do
      action_object, err = Action.new(value: action2)
      expect(action_object.value).to eq action2
    end

    it 'actionはcreateかupdateじゃないとエラーになる' do
      _, err = Action.new(value: "hogehoge")
      expect(err).not_to be nil
    end

  end
end
