class ModelId
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'id is must be a integer or romaji' unless !value.match(/[^0-9a-zA-Z]/)
    super(value: value)
  end
end
