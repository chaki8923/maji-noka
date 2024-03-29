# frozen_string_literal: true

require 'base64'
Dotenv.load
ACCESS_KEY = ENV.fetch('ACCESS_KEY_ID', nil)
SECRET_KEY = ENV.fetch('SECRET_ACCESS_KEY', nil)
REGION = 'ap-northeast-1'
BUCKET = 'maji-image'
class SliderImageController < ApplicationController # rubocop:disable Style/Documentation
  def new
    @slide_instance = SliderImage.new
    @prm = {
      file_name: nil,
      ctype: nil
    }
  end

  def create
    @slide_instance = SliderImage.new(slide_params)
    res = @slide_instance.create(slide_params)
    if res == true
      Rails.logger.debug "イメージアップロード処理---------------------------------#{item_params}"
      redirect_to item_index_path, notice: '商品が登録されました'
    else
      render action: 'new'
    end
  end

  def index
    data = SliderImage.new
    @slide_image = data.index
  end

  def edit
    @slide_instance = SliderImage.new
    @slide_image = get_item(params.permit(:id), @slide_instance)
    redirect_to item_index_path, alert: @item[:err_message] if @item[:err_message].present?
  end

  def update
    @slide_instance = Item.new(item_params)
    @slide = get_item(slide_params, @slide_instance)
    res = @slide_instance.update(item_params)
    if res == true
      redirect_to item_index_path, notice: '商品が編集されました'
    else
      render action: 'edit'
    end
  end

  def delete
    @slide_instance = Item.new(params.permit(:id))
    res = @item_instance.delete
    if res.key?('id')
      redirect_to item_index_path, notice: '商品が削除されました'
    else
      redirect_to item_index_path, alert: res["err_message"]
    end

  end

  private

  def item_params
    images = []
    (1..4).each do |num|
      images.push(params['item']["image#{num}"])
    end
    ## TODO：あとで消す
    params.require(:item).permit(
      :id,
      :name,
      :price,
      :description,
      :postage,
      :inventory,
      :maji_flag,
      :action,
      :category_id
    ).merge!(images: images)
  end

  def get_s3_resource(access_key, secret_key, region)
    Aws::S3::Resource.new(
      access_key_id: access_key,
      secret_access_key: secret_key,
      region: region
    )
  end

  def get_item(id, item)
    item.edit(id)
  end
end
