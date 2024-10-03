module ValueObject
  class DateFormat
    attr_reader :value
    def initialize(value:)
      @value = value
    end
  
    def self.new(value:)
      return nil, 'date be a datefomat' unless value.is_a?(Date)
      super(value: value)
    end
  end
end
