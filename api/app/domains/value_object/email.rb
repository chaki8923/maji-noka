Dir['/api/app/domains/query_service/*.rb'].each { |file| require file }
module ValueObject
  class Email
    attr_reader :value
    def initialize(value:)
      @value = value
    end
  
    def self.new(value:)
  
      adq = AdminQuery.new
      mailRegex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      return nil, 'mail is must be a string' unless value.is_a?(String)
      return nil, 'mail is must be a mail form' unless value.match? mailRegex
      return nil, 'mail is must be include "@"' unless value.include?("@")
      return nil, 'this address is already exits' if adq.check_mail(value).present?
      super(value: value)
    end
  end
end
