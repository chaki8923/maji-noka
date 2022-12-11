class SampleMailController < ApplicationController

  def mail
    @data = SampleMail.new
    ## TODO：あとで消す
    Rails.logger.debug "SampleMail.action_methods---------------------------------#{SampleMailer.action_methods}"
    hoge = SampleMailer.hoge
    Rails.logger.debug "hoge---------------------------------#{hoge.class}"

    render template: 'sample_mailer/mail',status: 200
  end
  
  def send_mail
    SampleMailer.with(mail_params).sample_email.deliver_now
    redirect_to mail_comp_path
  end 

  def mail_comp
    render ('sample_mailer/mail_comp')
  end

  private
   def mail_params
    params.require(:sample_mail).permit(:email,:subject, :body)
   end
end