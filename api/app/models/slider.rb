# frozen_string_literal: true

Dir['/api/app/domains/value_object/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/command_service/*.rb'].sort.each { |file| require file }
Dir['/api/app/domains/query_service/*.rb'].sort.each { |file| require file }

class Slider # rubocop:disable Style/Documentation
  include ActiveModel::Model
  attr_accessor :id, :images
  def initialize(
    id:,
    images:
  )
    @id = id
    @images = images
    @idc = SliderCommand.new
  end

  def self.new(value)
    errors = []

    # Imageクラスに配列ごと渡して@value=[{}]の形にする
    images, err = SlideImage.new(value: value['images'])
    errors.push(err) unless images

    raise errors.join(', ') unless errors.blank?

    super(
      id: value[:id],
      images: images,
    )
  end

  def create
    @idc.create_db
  rescue StandardError => e
    raise e
  end

  def update
    @idc.update_db(
      id: @id,
      images: @images,
    )
  rescue StandardError => e
    raise e
  end

  class << self
    def index
      idq = SliderQuery.new
      idq.get_all
    end

    def find(id)
      idq = SliderQuery.new
      slider = idq.find(id)
      slider
    end

    def delete(id)
      idc = ItemCommand.new
      idc.delete_db(id: id)
    rescue StandardError => e
      ## TODO：あとで消す
    	Rails.logger.debug "err---------------------------------#{e}"
      raise e
    end

    def set_image_path(id, images)
      idc = SliderCommand.new
      idc.set_image_path(
        id: id,
        images: images,
      )
    rescue StandardError => e
      raise e
    end

  end
end
