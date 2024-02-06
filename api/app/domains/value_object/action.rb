class Action
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    ## TODO：あとで消す
    Rails.logger.debug "action_val---------------------------------#{value}"
    return nil, 'ようわからんことすな' unless value == "create" || value == "update"
    super(value: value)
  end
end
