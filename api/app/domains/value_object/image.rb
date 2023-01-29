class Image
  attr_reader :value
  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    ## TODO：あとで消す
    Rails.logger.debug "Imagevalue---------------------------------#{value.class}"
    value.each do |val|
      return nil, 'file is must be a string' unless val["name"].is_a?(String)
      return nil, 'file is more than 3000KByte' if val["size"] / 1000 > 3000
    end
    super(value: value)
  end
end