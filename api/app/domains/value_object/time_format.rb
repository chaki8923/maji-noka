module ValueObject
  class TimeFormat
    attr_reader :value
    def initialize(value:)
      @value = value
    end
  
    def self.new(value:)
      return nil, 'time be a timefomat' unless value.is_a?(Time)
      super(value: value)
    end
  end
end
