module ValueObject
  class Name
    attr_reader :value
    def initialize(value:)
      @value = value
    end
  
    def self.new(value:)
      return nil, 'name is must be' if value.blank?
      return nil, 'name is must be a string' unless value.is_a?(String)
      super(value: value)
    end
  end
end
