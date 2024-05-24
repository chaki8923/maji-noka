
# frozen_string_literal: true
require 'rails_helper'
require 'faker'
Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }

RSpec.describe TextFormat do
  let(:text) {"今後の予定はありません"}
  context 'new' do
    it 'インスタンスを生成できる' do
      object, err = TextFormat.new(value: text)
      expect(object.value).to eq text
    end

  end
end
