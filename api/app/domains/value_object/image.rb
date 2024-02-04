class Image
  attr_reader :value, :action
  def initialize(value:, action:)
    @value = value
    @action = action
  end

  def self.new(value:, action:)
    ## TODO：あとで消す
    Rails.logger.debug "imagevalue---------------------------------#{value}"
    Rails.logger.debug "action---------------------------------#{action}"
    return nil, '画像は流石に必要です' if value.nil? && action == "new"
    if value.present?
      value.each do |val|
        return nil, 'file is must be a string' unless val["name"].is_a?(String) && value.present?
        return nil, 'file is more than 3000KByte' if val["size"] / 1000 > 3000
      end
    end
    super(value: value, action: action)
  end
end