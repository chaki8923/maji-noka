# frozen_string_literal: true

class SendMail < BaseModel
  attr_accessor :item,
                :email,
                :purchase_id,
                :state,
                :country,
                :postal_code,
                :line1,
                :line2,
                :customer_id


  def send(params)
    res = execute_api('mail/send_mail', params, method: 'post')
    convert_boolean(res)
  end

  def bulk_send(params)
    res = execute_api('mail/bulk_send_mail', params, method: 'post')
    convert_boolean(res)
  end
end
