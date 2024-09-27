# frozen_string_literal: true
class SliderController < ApplicationController # rubocop:disable Style/Documentation
  after_action :set_csrf_token_header
  def new
    @slide_instance = Slider.new
    @list = @slide_instance.index
    ## TODO：あとで消す
    	Rails.logger.debug "list---------------------------------#{@list}"
  end

  def create
    @slider_instance = Slider.new
    res = @slider_instance.create(slider_params)
    if res == true
      redirect_to slider_new_path, notice: '画像が登録されました'
    else
      render action: 'new'
    end
  end

  def index
    data = Item.new
    @items = Kaminari.paginate_array(data.index).page(params[:page])
  end

  def edit
    @item_instance = Item.new
    @item = get_item(params.permit(:id), @item_instance)
    category_instance = Category.new
    @categories = category_instance.index
    redirect_to item_index_path, alert: @item[:err_message] if @item[:err_message].present?
  end

  def update
    @slider_instance = Slider.new
    res = @slider_instance.update(slider_params)
    if res == true
      redirect_to slider_new_path, notice: '画像が更新されました'
    else
      render action: 'new'
    end
  end

  private

  def slider_params
    params.require(:slider).permit(
      :id,
      { images: [] }
    )
  end

  def slide_save(slider)
    if slider.save
      redirect_to slider_new_path, notice: '画像が登録されました'
    else
      render action: 'new'
    end
  end

  def slide_update(slider)
    if slider.update(slider_params)
      redirect_to slider_new_path, notice: '画像が更新されました'
    else
      render action: 'new'
    end
  end
end
