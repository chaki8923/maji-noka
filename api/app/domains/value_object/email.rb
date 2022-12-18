class Email
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    mailRegex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
    ## TODO：あとで消す
    Rails.logger.debug "value.match? mailRegex?---------------------------------#{value.match? mailRegex}"
    return nil, 'mail is must be a string' unless value.is_a?(String)
    return nil, 'mail is must be a mail form' unless value.match? mailRegex
    return nil, 'mail is must be include "@"' unless value.include?("@")
    super(value: value)
  end
end
