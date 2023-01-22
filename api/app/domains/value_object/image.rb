class Image
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    ## TODO：あとで消す
    Rails.logger.debug "Imagevalue---------------------------------#{value}"
    # return nil, 'file is must be a string' unless value[:file_name].is_a?(String)
    super(value: value)
  end
end