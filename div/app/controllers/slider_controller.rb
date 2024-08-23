# frozen_string_literal: true
# ここだけ特別にActiverecordを使用
class SliderController < ApplicationController # rubocop:disable Style/Documentation
  def new
    @slide_instance = Slider.new
    @list = @slide_instance.index
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
    @item_instance = Item.new(item_params)
    item_params['maji_flag'] = item_params['maji_flag'].to_i == 1
    @item = get_item(item_params, @item_instance)
    category_instance = Category.new
    @categories = category_instance.index
    res = @item_instance.update(item_params)
    if res == true
      redirect_to item_index_path, notice: '商品が編集されました'
    else
      render action: 'edit'
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
