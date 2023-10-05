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

      errors << "Detected extra keys in message #{detected.class.name}: #{extra_keys}" unless extra_keys.empty?
      errors << "Missing keys in message #{detected.class.name}: #{missing_keys}" unless missing_keys.empty?
      errors
    rescue StandardError => e
      ["Unexpected error: #{e.message}"]
    end

    private

    def detected_keys
      @detected_keys ||= detected.to_h(reject_nil_values: true).keys.sort
    end

    def expected_keys
      @expected_keys ||= expected.to_h(reject_nil_values: true).keys.sort
    end

    def identical_keys?
      detected_keys == expected_keys
    end

    def meta_message?
      detected.instance_of?(Cucumber::Messages::Meta)
    end

    def errors
      @errors ||= []
    end
  end
end
