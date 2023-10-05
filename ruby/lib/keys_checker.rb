# frozen_string_literal: true

module CCK
  class KeysChecker
    def self.compare(detected, expected)
      new(detected, expected).compare
    end

    attr_reader :detected, :expected

    def initialize(detected, expected)
      @detected = detected
      @expected = expected
    end

    def compare
      return [] if identical_keys?

      missing_keys = (expected_keys - detected_keys).reject { |key| meta_message? && key == :ci }
      extra_keys = (detected_keys - expected_keys).reject { |key| meta_message? && key == :ci }

      errors << "Detected extra keys in message #{message_name}: #{extra_keys}" unless extra_keys.empty?
      errors << "Missing keys in message #{message_name}: #{missing_keys}" unless missing_keys.empty?
      errors
    rescue StandardError => e
      ["Unexpected error: #{e.message}"]
    end

    private

    def detected_keys
      @detected_keys ||= ordered_uniq_hash_keys(detected)
    end

    def expected_keys
      @expected_keys ||= ordered_uniq_hash_keys(expected)
    end

    def identical_keys?
      detected_keys == expected_keys
    end

    def meta_message?
      detected.instance_of?(Cucumber::Messages::Meta)
    end

    def message_name
      detected.class.name
    end

    def ordered_uniq_hash_keys(object)
      object.to_h(reject_nil_values: true).keys.sort
    end

    def errors
      @errors ||= []
    end
  end
end
