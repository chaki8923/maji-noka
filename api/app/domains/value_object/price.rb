class Price
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'price is must be' if value.blank?
    return nil, 'price is must be more 50' if value.to_i < 50
    return nil, 'price is must be a integer' if value.to_i == 0 && value != "0"
    super(value: value)
  end
end
