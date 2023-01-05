class Price
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)

    ## TODO：あとで消す
    Rails.logger.debug "price---------------------------------#{value}"
    # return nil, 'price is must be a integer' unless value.is_a?(Integer)


    super(value: value)
  end
end