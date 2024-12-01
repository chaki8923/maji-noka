class SendMailer < ApplicationMailer

  def send_email
    @email = params[:email]
    @item = params[:item]
    @subject = "商品配送のお知らせ"
    @postal_code = params[:postal_code]
    @address = "#{params[:state]}#{params[:line1]}#{params[:line2]}"
    @contact_form = "https://web.maji-noka.com/contact"
    mail(to: @email, subject: @subject)
  end

  def bulk_send_email
    @email = params.first[:email]
    @items = []
    params.each do |p|
      @items.push(p[:item_name])
    end
    @subject = "商品配送のお知らせ"
    @postal_code = params.first[:postal_code]
    @address = "#{params.first[:state]}#{params.first[:line1]}#{params.first[:line2]}"
    @contact_form = "https://web.maji-noka.com/contact"
    mail(to: @email, subject: @subject)
  end
end
