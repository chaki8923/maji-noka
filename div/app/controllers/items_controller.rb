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
    if res.key?(:id)
      Rails.logger.debug "イメージアップロード処理---------------------------------#{item_params}"
      redirect_to index_path, notice: '商品が登録されました'
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
  end

  def update
    @item_instance = Item.new(item_params)
    item_params['maji_flag'] = item_params['maji_flag'].to_i == 1
    res = @item_instance.update(item_params)
    if res.key?('id')
      ## TODO:あとで消す
      Rails.logger.debug "update_res---------------------------------#{res}"
      redirect_to index_path, notice: '商品が編集されました'
    else
      @item = get_item(item_params, @item_instance)
      ## TODO：あとで消す
      render action: 'edit'
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
    ## TODO：あとで消す
    Rails.logger.debug "id---------------------------------#{id}"
    item.edit(id)
  end
end
