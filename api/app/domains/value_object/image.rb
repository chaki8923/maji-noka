# frozen_string_literal: true

module ValueObject
  class Image # rubocop:disable Style/Documentation
    attr_reader :value, :action
  
    def initialize(value:, action:)
      @value = value
      @action = action
    end
  
    def self.new(value:, action:)
      return nil, '画像は流石に必要です' if value.nil? && action == 'create'
  
      if value.present?
        value.each do |val|
          return nil, "file is must be a string" unless val.original_filename.is_a?(String) && value.present?
          return nil, 'file is more than 2000KByte' if val.size / 1000 > 2000
        end
      end
      super(value: value, action: action)
    end
  end
end
