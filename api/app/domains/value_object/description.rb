class Description
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value)

    # return nil, 'description is must be a string' unless value.is_a?(String)


    super(value: value)
  end
end