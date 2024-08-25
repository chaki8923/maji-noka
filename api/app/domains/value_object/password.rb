class Password
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'password is min length 6' if value.length < 6
    return nil, 'password is min must be string' if value.blank?

    super(value: BCrypt::Password.create(value))
  end
end
