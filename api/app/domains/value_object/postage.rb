module ValueObject
  class Postage
    attr_reader :value
    def initialize(value:)
      @value = value
    end
  
    def self.new(value:)
      return nil, 'postage is must be a Integer' if value.to_i == 0 && value != "0"
      super(value: value)
    end
  end
end
