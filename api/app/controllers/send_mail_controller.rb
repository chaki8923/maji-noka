# frozen_string_literal: true

class SendMailController < ApplicationController # rubocop:disable Style/Documentation

  def send_mail
    begin
      support_flag = check_and_toggle_support_flag(id: mail_params[:purchase_id])
      purchase = Purchase.new({purchase_id: mail_params[:purchase_id]})
      SendMailer.with(mail_params).send_email.deliver_now if support_flag
      purchase.toggle_support_flag(purchase_id: purchase.purchase_id, support_flag: support_flag)
      render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
    rescue => err_message
      Rails.logger.debug "err_message---------------------------------#{err_message}"
      render json: {value: nil, err_message: err_message}, status: :internal_server_error
    end
  end

  private

  def mail_params
    params.permit(:email, :item, :purchase_id, :state, :country, :postal_code, :line1, :line2)
  end

  def check_and_toggle_support_flag(id:)
    purchase = Purchase.find(id: id)
    !purchase[:support_flag]
  end
end
