class Password
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'password is min length 5' if value.length < 5
    return nil, 'password is min must be string' if value.nil?
    
    super(value: BCrypt::Password.create(value))
  end
end
