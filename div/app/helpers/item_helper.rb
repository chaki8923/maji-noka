module ItemHelper

  def s3_first_image(signer, image)

    image = signer.presigned_url(:get_object,
        bucket: BUCKET, 
        key: "item/#{image[0]["name"]}", 
        expires_in: 60)
    
  end
end
