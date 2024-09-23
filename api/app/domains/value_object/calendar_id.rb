class CalendarId
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, 'calendar_id is must be' if value.blank?
    super(value: value)
  end
end
