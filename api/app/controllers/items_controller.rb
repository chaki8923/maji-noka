# frozen_string_literal: true
require 'sequel'
class ItemsController < ApplicationController # rubocop:disable Style/Documentation
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])
  Dotenv.load
  ACCESS_KEY = ENV.fetch('ACCESS_KEY_ID', nil)
  SECRET_KEY = ENV.fetch('SECRET_ACCESS_KEY', nil)
  REGION = 'ap-northeast-1'
  BUCKET = Rails.configuration.s3_bucket
  after_action :set_csrf_token_header

  def create
    item = Item.new(item_params)
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    res = item.create
    item_images_upload(item_params, s3resource, res.first[:id])
    render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
  rescue => err_message
    Rails.logger.debug "err_message---------------------------------#{err_message}"
    Rails.logger.debug "Backtrace: #{err_message.backtrace.join("\n")}"
    render json: {value: nil, err_message: err_message}, status: :internal_server_error
  end

  def update
    item = Item.new(item_params)
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    res = item.update
    item_images_upload(item_params, s3resource, res.first[:id])
    # image_count = object_count(res.first[:id])
    # item.update_image_count(res.first[:id], image_count)
    render json: { value: nil, success_message: SystemMessage::API_SUCCESS }
  rescue => err_message
    ## TODO:Chakiあとで消す
    Rails.logger.debug "err_message---------------------------------#{err_message}"
    render json: {value: nil, err_message: err_message}, status: :internal_server_error
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
    rescue => err_message
      render json: {value: nil, err_message: err_message}, status: :not_found
  end

  def delete
    s3resource = get_s3_resource(ACCESS_KEY, SECRET_KEY, REGION)
    object_key = "item/#{params['id']}/"
    delete_item = Item.find(params['id'])
    res = Item.delete(delete_item[:id])
    s3_delete(s3resource, object_key)
    render json: res[0]
  rescue => err_message
    render json: {value: nil, err_message: err_message}, status: :internal_server_error
  end

  private

  def item_params
    params.permit(
      :id,
      :name,
      :price,
      :description,
      :postage,
      :inventory,
      :maji_flag,
      :action,
      :category_id,
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

    item_params['images'].each_with_index do |image, idx|
      file_name = "item_#{image.original_filename}_#{item_id}"
      file_path = Rails.root.join('public/images', file_name)
      FileUtils.mkdir_p('public/images')
      image_upload(image, file_name)
      # 画像圧縮
      compress_image("public/images/#{file_name}")
      content_type = image.content_type
      # s3へアップロード
      s3_key = "item/#{item_id}/#{file_name}"
      s3_upload(s3resource, s3_key, file_path, content_type)
      s3_url = s3resource.bucket(BUCKET).object(s3_key).public_url
      Item.set_image_path(item_id, s3_url, image.original_filename)
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

  def s3_upload(s3resource, key, file_path, content_type)
    s3resource.bucket(BUCKET).object(key).upload_file(file_path, content_type: content_type)
  end

  def s3_delete(s3resource, key)
    bucket = s3resource.bucket(BUCKET)
    target_s3_directory = bucket.objects({prefix: key})

    target_s3_directory.batch_delete!
  rescue Aws::S3::Errors::ServiceError => e
    render json: {value: nil, err_message: "オブジェクトの削除中にエラーが発生しました：#{e.message}"}, status: :not_found
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

  def object_count(id)
    aws_config_update
    s3 = Aws::S3::Client.new
    resp = s3.list_objects_v2(bucket: BUCKET, prefix: "item/#{id}/")

    resp.key_count
  end

  def aws_config_update
    Aws.config.update({
                        region: REGION,
                        credentials: Aws::Credentials.new(ACCESS_KEY, SECRET_KEY)
                      })
  end

end
