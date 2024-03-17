class DateFormat
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    ## TODO：あとで消す
    Rails.logger.debug "time_value---------------------------------#{value}"
    Rails.logger.debug "time_valueClass---------------------------------#{value.class}"
    return nil, 'date be a datefomat' unless value.is_a?(Date)
    super(value: value)
  end
end
