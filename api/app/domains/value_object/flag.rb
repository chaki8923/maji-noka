module ValueObject
  class Flag
    attr_reader :value
    def initialize(value:)
      @value = value
    end
  
    def self.new(value:)
      value = value.to_i == 1 ? true : false
      return nil, 'flag is must be format boolean' unless value.is_a?(TrueClass) || value.is_a?(FalseClass)
      super(value: value)
    end
  
    def to_bool(val)
      return val.to_i == 1 ? true : false
    end
  end
end
