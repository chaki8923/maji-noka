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

  def bulk_send_mail
    begin
      ## TODO：あとで消す
      mail_params_to_json = params_to_json(mail_params)
      send_customer_count = mail_params_to_json["email"].uniq.count
      (0...send_customer_count).each_with_index do |_, idx|
        # ユーザーごとの購入り機
        purchase_per_user =
          get_purchase_per_user(
            customer_id: mail_params_to_json["customer_id"][idx],
            purchase_id: mail_params_to_json["purchase_id"]
          )
        Rails.logger.debug "purchase_per_user---------------------------------#{purchase_per_user}"
        SendMailer.with(purchase_per_user).bulk_send_email.deliver_now
      end
      mail_params_to_json["purchase_id"].each do |prms|
        ## TODO：あとで消す
    	  Rails.logger.debug "prms---------------------------------#{prms}"
        purchase = Purchase.new({purchase_id: prms})
        support_flag = check_and_toggle_support_flag(id: prms)
        purchase.toggle_support_flag(purchase_id: purchase.purchase_id, support_flag: support_flag)
      end
      render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
    rescue => err_message
      Rails.logger.debug "err_message---------------------------------#{err_message}"
      render json: {value: nil, err_message: err_message}, status: :internal_server_error
    end
  end

  private

  def mail_params
    params.permit(:email, :item, :purchase_id, :state, :country, :postal_code, :line1, :line2, :customer_id)
  end

  def check_and_toggle_support_flag(id:)
    purchase = Purchase.find(id: id)
    !purchase[:support_flag]
  end

  def params_to_json(params)
    params.each do |key, value|
      params[key] = JSON.parse(value)
    end
    params
  end

  def get_purchase_per_user(customer_id:, purchase_id:)
    Purchase.find_by_user(customer_id: customer_id, purchase_id: purchase_id)
  end
end
