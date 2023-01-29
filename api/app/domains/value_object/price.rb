class Price
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'price is must be a integer' unless value.to_i.is_a?(Integer)
    super(value: value)
  end
end