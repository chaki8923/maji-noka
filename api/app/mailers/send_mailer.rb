class SendMailer < ApplicationMailer

  def send_email
    @email = params[:email]
    @item = params[:item]
    @subject = "商品配送のお知らせ"
    @postal_code = params[:postal_code]
    @address = "#{params[:state]}#{params[:line1]}#{params[:line2]}"
    @contact_form = "http://localhost:3000/contact"
    mail(to: @email, subject: @subject)
  end
end
