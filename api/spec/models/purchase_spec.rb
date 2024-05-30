# frozen_string_literal: true
require 'rails_helper'
require 'faker'

RSpec.describe Purchase do

  let(:id) { "aaaabbb" }
  let(:purchase) do
    params = {purchase_id: id}
    purchase, _ =
      Purchase.new(params)
    return purchase
  end

  context 'id.value' do
    it 'purchase_idが参照出来る' do
      expect(purchase.purchase_id).to eq id
    end
  end

end
