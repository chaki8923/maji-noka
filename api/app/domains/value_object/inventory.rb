class Inventory
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'inventory is must be a Integer' unless value.to_i.is_a?(Integer)
    super(value: value)
  end
end
