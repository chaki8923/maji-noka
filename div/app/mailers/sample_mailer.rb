class SampleMailer < ApplicationMailer

  def sample_email
    @email = params[:email]
    @subject = params[:subject]
    @body = params[:body]
    mail(to: @email, subject: @subject, body: @body)
  end


  def hogehoge

  end

  def mukimuki
    
  end
end
