# frozen_string_literal: true

class SendMailController < ApplicationController # rubocop:disable Style/Documentation
  def mail
    @data = SendMail.new
    render template: 'send_mailer/mail', status: 200
  end

  def send_mail
    @send_mail = SendMail.new(mail_params)
    res = @send_mail.send(mail_params)
    if res
      redirect_to purchase_index_path, notice: '発送済みメールを送信しました'
    else
      redirect_to purchase_index_path, alert: 'エラー発生。メールが送信されていません'
    end

  end

  def bulk_send_mail
    @send_mail = SendMail.new(mail_params)
    ## TODO：あとで消す
    Rails.logger.debug "bulk_params---------------------------------#{params}"
    res = @send_mail.bulk_send(mail_params)
    if res
      redirect_to purchase_index_path, notice: '発送済みメールを送信しました'
    else
      redirect_to purchase_index_path, alert: 'エラー発生。メールが送信されていません'
    end

  end

  def mail_comp
    render('send_mailer/mail_comp')
  end

  private

  def mail_params
    params
    .require(:send_mail)
    .permit(
      :email,
      :item,
      :purchase_id,
      :state,
      :country,
      :postal_code,
      :line1,
      :line2,
      email: [],
      item: [],
      purchase_id: [],
      state: [],
      country: [],
      postal_code: [],
      line1: [],
      line2: [],
      customer_id: [],
    )
  end
end
