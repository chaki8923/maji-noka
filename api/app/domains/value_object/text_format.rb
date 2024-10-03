module ValueObject
  class TextFormat
    attr_reader :value
    def initialize(value:)
      @value = value
    end
  
    def self.new(value:)
      return nil, 'must be a string' unless value.is_a?(String)
      super(value: value)
    end
  end
end
