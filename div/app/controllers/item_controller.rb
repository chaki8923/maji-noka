require 'base64'
class ItemController < ApplicationController
  def new
    @data = Item.new
    @prm = {
      :file_name => nil,
      :ctype => nil,
      }
  end

  def create
    @data = Item.new(item_params)
    ## TODO：あとで消す
    file = params["item"]["image"]
    file_prm = {"file" =>{
      :file_name => file.original_filename,
      :ctype =>  file.content_type,
      :read => file.read
      }}
    prms = item_params.to_h.merge(file_prm)

    res = @data.create(prms)
    if res == true
      redirect_to index_path
    else
      render action: 'new'
    end
  end

  def index
    data = Item.new
    items = data.index
    ## TODO：あとで消す
    Rails.logger.debug "items---------------------------------#{items}"
  end

  private
   def item_params
    params.require(:item).permit(:name, :price, :description, file: [])
   end

end