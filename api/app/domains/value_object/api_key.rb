class ApiKey
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'api_key is must be' if value.blank?
    super(value: value)
  end
end
