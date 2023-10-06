# frozen_string_literal: true

module CCK
  class Helpers
    def message_type(message)
      message.to_h.each do |key, value|
        return key unless value.nil?
      end
    end
  end
end