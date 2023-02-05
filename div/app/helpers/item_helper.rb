module ItemHelper
  def sample(text)
    return "茶木さん#{text}"
  end

  def s3_first_image(signer, image)
    ## TODO：あとで消す
    Rails.logger.debug "helper---------------------------------#{image}"
    image = signer.presigned_url(:get_object,
        bucket: BUCKET, 
        key: "item/#{image[0]["name"]}", 
        expires_in: 60)
    
  end
end
