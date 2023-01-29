class Description
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)

    ## TODO：あとで消す
    Rails.logger.info "discription---------------------------------#{value}"
    Rails.logger.info "discription---------------------------------#{value.class}"
    return nil, 'description is must be a string' unless value.is_a?(String)
    return nil, 'description is must' if value.length < 1


    super(value: value)
  end
end