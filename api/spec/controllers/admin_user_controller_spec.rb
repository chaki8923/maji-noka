require 'rails_helper'

RSpec.describe YourController, type: :controller do
  describe '#signup' do
    let(:valid_params) { { admin_user: { username: 'testuser', password: 'password' } } }

    context 'when valid parameters are provided' do
      it 'creates a new admin user' do
        expect {
          post :signup, params: valid_params
        }.to change(AdminUsers, :count).by(1)
      end

      it 'returns a success JSON response' do
        post :signup, params: valid_params
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to eq({ 'value' => nil, 'success_message' => SystemMessage::API_SUCCESS })
      end
    end

    context 'when invalid parameters are provided' do
      let(:invalid_params) { { admin_user: { username: '', password: 'password' } } }

      it 'does not create a new admin user' do
        expect {
          post :signup, params: invalid_params
        }.not_to change(AdminUsers, :count)
      end

      it 'returns an error JSON response' do
        post :signup, params: invalid_params
        expect(response).to have_http_status(:internal_server_error)
        expect(JSON.parse(response.body)).to include('value' => nil)
      end
    end
  end
end
