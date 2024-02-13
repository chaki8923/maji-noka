# frozen_string_literal: true

class ItemsController < ApplicationController # rubocop:disable Style/Documentation
  Dotenv.load
  ACCESS_KEY = ENV.fetch('ACCESS_KEY_ID', nil)
  SECRET_KEY = ENV.fetch('SECRET_ACCESS_KEY', nil)
  REGION = 'ap-northeast-1'
  BUCKET = 'maji-image'
  after_action :set_csrf_token_header

  def create
    item = Item.new(item_params)
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    ## TODO:あとで消す
    Rails.logger.debug "item---------------------------------#{item}"
    # エラーの場合はオブジェクトではなくArrayで返ってくる
    if item.instance_of?(Item)
      res = item.create(item)
      item_images_upload(item_params, s3resource, res.first[:id])
      render json: res[0]
    else
      render json: item
    end
  end

  def update
    ## TODO：あとで消す
    Rails.logger.debug "item_params---------------------------------#{item_params}"
    item = Item.new(item_params)
    ## TODO：あとで消す
    Rails.logger.debug "item---------------------------------#{item.inspect}"
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    if item.instance_of?(Item)
      res = item.update(item)
      item_images_upload(item_params, s3resource, res.first[:id])
      render json: res[0]
    else
      render json: item
    end
  end

  def index
    res = Item.index
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    signer = Aws::S3::Presigner.new(client: s3resource.client)
    res.map do |d|
      d[:image] = item_first_image(signer, d)
    end

    render json: res
  end

  def show
    res = Item.find(params['item_id'])
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    signer = Aws::S3::Presigner.new(client: s3resource.client)
    res[:image] = item_get_images(signer, res)
    render json: res
  end

  def edit
    res = Item.find(params['id'])
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    signer = Aws::S3::Presigner.new(client: s3resource.client)
    res[:image] = item_get_images(signer, res)
    render json: res
  end

  def delete
    data = AdminQuery.new
    res = data.get_admin_user(params['email'])
    render json: res
  end

  private

  def item_params
    #  params.permit(:name, :price, :description,  file: [:file_name, :ctype])
    params.permit(
      :id,
      :name,
      :price,
      :description,
      :postage,
      :inventory,
      :maji_flag,
      :action,
      images: []
    )
  end

  def get_s3_resource(access_key, secret_key, region)
    Aws::S3::Resource.new(
      access_key_id: access_key,
      secret_access_key: secret_key,
      region: region
    )
  end

  def item_first_image(signer, item)
    image_hash = []
    file_name = "item_image_0_#{item[:id]}"
    url = signer
      .presigned_url(
        :get_object,
        bucket: BUCKET,
        key: "item/#{item[:id]}/#{file_name}",
        expires_in: 60
      )
    image_hash.push(url)
    image_hash
  end

  def item_get_images(signer, item)
    aws_config_update
    s3 = Aws::S3::Client.new
    image_hash = []
    (0..3).each do |num|
      object_key = "item/#{item[:id]}/item_image_#{num}_#{item[:id]}"
      # オブジェクトが存在しなければurl生成しない
      next unless s3_object_exists?(s3, object_key)

      url =
        signer
        .presigned_url(
          :get_object,
          bucket: BUCKET,
          key: object_key,
          expires_in: 60
        )
      image_hash.push(url)
    end
    image_hash
  end

  def item_images_upload(item_params, s3resource, item_id)
    return if item_params['images'].nil?

    item_params['images'].each do |image|
      ## TODO：あとで消す
      Rails.logger.debug "image---------------------------------#{image}"
      file_name = "item_#{image.original_filename}_#{item_id}"
      file_path = Rails.root.join('public/images', file_name)
      FileUtils.mkdir_p('public/images')
      image_upload(image, file_name)
      # 画像圧縮
      compress_image("public/images/#{file_name}")
      # s3へアップロード
      s3_key = "item/#{item_id}/#{file_name}"
      s3_upload(s3resource, s3_key, file_path)
      # ローカルのデータは消す
      image_delete(file_path)
    end
  rescue StandardError => e
    raise e
  end

  def image_upload(file, file_name)
    output_path = Rails.root.join('public/images', file_name)
    File.binwrite(output_path, file.read)
  end

  def s3_upload(s3resource, key, file_path)
    s3resource.bucket(BUCKET).object(key).upload_file(file_path)
  end

  def s3_delete(s3resource, key, file_path)
    # TODO: 勘で書いたのでテスト必要
    Rails.logger.info "S3の#{file_path}を削除---------------------------------"
    s3resource.bucket(BUCKET).object(key).delete(file_path)
  end

  def compress_image(file_path)
    image = MiniMagick::Image.open(file_path)
    image.resize '40%'
    image.write file_path
  end

  def image_delete(file_name)
    File.delete(file_name)
  end

  def s3_object_exists?(s3, object_key) # rubocop:disable Naming/MethodParameterName
    # オブジェクトが存在しなければurl生成しない
    s3.head_object(bucket: BUCKET, key: object_key)
    true
  rescue Aws::S3::Errors::NotFound
    false
  end

  def aws_config_update
    Aws.config.update({
                        region: REGION,
                        credentials: Aws::Credentials.new(ACCESS_KEY, SECRET_KEY)
                      })
  end
end
