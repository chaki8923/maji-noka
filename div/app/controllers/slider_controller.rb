# frozen_string_literal: true
# ここだけ特別にActiverecordを使用
class SliderController < ApplicationController # rubocop:disable Style/Documentation
  def new
    @slide_instance = Slider.new
    @sliders = Slider.find(1) if slide_exist?(Slider)
  end

  def create
    if slide_exist?(Slider)
      slider = Slider.find(1)
      slide_update(slider)
    else
      slider = Slider.new(slider_params)
      slide_save(slider)
    end
  end

  def index
    @slide_instance = Slider.find(1)
  end

  def edit

  end

  def update

  end

  def delete

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

  def slide_exist?(slide)
    all_slide = slide.all
    all_slide.count > 0
  end
end
