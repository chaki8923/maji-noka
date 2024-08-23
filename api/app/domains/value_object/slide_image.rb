# frozen_string_literal: true

class SlideImage # rubocop:disable Style/Documentation
  attr_reader :value, :action

  def initialize(value:)
    @value = value
  end

  def self.new(value:)
    return nil, '画像は流石に必要です' if value.nil?

    if value.present?
      value.each do |val|
        return nil, "file is must be a string" unless val.original_filename.is_a?(String) && value.present?
        return nil, 'file is more than 2000KByte' if val.size / 1000 > 2000
      end
    end
    super(value: value)
  end
end
