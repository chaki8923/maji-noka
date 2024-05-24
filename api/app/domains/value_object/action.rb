class Action
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'ようわからんことすな' unless value == "create" || value == "update"
    super(value: value)
  end
end
