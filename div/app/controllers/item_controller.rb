require 'base64'
class ItemController < ApplicationController
  def new
    ## TODO：あとで消す
    Rails.logger.debug "item_new---------------------------------#{}"
    @data = Item.new
    @prm = {
      :file_name => nil,
      :ctype => nil,
      }
  end

  def create
    @data = Item.new(item_params)
    
    @item = item_params
    [1, 2, 3, 4].map do |num|
      file_prm = []
      @prms = []
      Rails.logger.debug "params_image#{num}---------------------------------#{params["item"]["image#{num}"]}"
      file = params["item"]["image#{num}"]
      if file.present?
        file_prm[num] = {"file#{num}" =>{
          :file_name => file.original_filename,
          :ctype =>  file.content_type,
          # :read => file.read
          }} 
          ## TODO：あとで消す
          Rails.logger.debug "file_prm[num]---------------------------------#{file_prm[num]}"
          @prms[num] = @item.to_h.merge!(file_prm[num])
          # Rails.logger.debug "@prms---------------------------------#{@prms}"
      end
    end
    @prms = @prms[1] + @prms[2] 
    ## TODO：あとで消す
    Rails.logger.debug "渡すprms_1---------------------------------#{@prms[1]}"
    res = @data.create(@prms)
    if res == true
      redirect_to index_path
    else
      render action: 'new'
    end
  end

  def index
    data = Item.new
    items = data.index
  end

  private
   def item_params
    params.require(:item).permit(:name, :price, :description, :file1, :file2, :file3, :file4)
   end

end