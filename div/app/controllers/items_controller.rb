# frozen_string_literal: true

require 'base64'
Dotenv.load
ACCESS_KEY = ENV.fetch('ACCESS_KEY_ID', nil)
SECRET_KEY = ENV.fetch('SECRET_ACCESS_KEY', nil)
REGION = 'ap-northeast-1'
BUCKET = 'maji-image'
class ItemsController < ApplicationController # rubocop:disable Style/Documentation
  def new
    @item_instance = Item.new
    @prm = {
      file_name: nil,
      ctype: nil
    }
  end

  def create
    @item_instance = Item.new(item_params)
    item_params['maji_flag'] = item_params['maji_flag'].to_i == 1
    res = @item_instance.create(item_params)
    ## TODO：あとで消す
    Rails.logger.debug "item_res---------------------------------#{res}"
    ## TODO:あとで消す
    if res == true
      Rails.logger.debug "イメージアップロード処理---------------------------------#{item_params}"
      redirect_to item_index_path, notice: '商品が登録されました'
    else
      render action: 'new'
    end
  end

  def index
    data = Item.new
    @items = data.index
  end

  def edit
    @item_instance = Item.new
    @item = get_item(params.permit(:id), @item_instance)
    redirect_to item_index_path, alert: @item[:err_message] if @item[:err_message].present?
  end

  def update
    @item_instance = Item.new(item_params)
    item_params['maji_flag'] = item_params['maji_flag'].to_i == 1
    @item = get_item(item_params, @item_instance)
    res = @item_instance.update(item_params)
    ## TODO：あとで消す
    Rails.logger.debug "update_res---------------------------------#{res.class}"
    if res == true
      redirect_to item_index_path, notice: '商品が編集されました'
    else
      render action: 'edit'
    end
  end

  def delete
    @item_instance = Item.new(params.permit(:id))
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
      :action
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
