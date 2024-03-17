class TimeFormat
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    ## TODO：あとで消す
    Rails.logger.debug "time_value---------------------------------#{value}"
    Rails.logger.debug "time_valueClass---------------------------------#{value.class}"
    return nil, 'time be a timefomat' unless value.is_a?(Time)
    super(value: value)
  end
end
