# frozen_string_literal: true

module CCK
  class KeysChecker
    def self.compare(found, expected)
      new(found, expected).compare
    end

    attr_reader :found, :expected

    def initialize(found, expected)
      @found = found
      @expected = expected
    end

    def compare
      return [] if identical_keys?

      missing_keys = (expected_keys - found_keys).reject { |key| meta_message? && key == :ci }
      extra_keys = (found_keys - expected_keys).reject { |key| meta_message? && key == :ci }

      errors << "Found extra keys in message #{found.class.name}: #{extra_keys}" unless extra_keys.empty?
      errors << "Missing keys in message #{found.class.name}: #{missing_keys}" unless missing_keys.empty?
      errors
    rescue StandardError => e
      ["Unexpected error: #{e.message}"]
    end

    private

    def found_keys
      @found_keys ||= found.to_h(reject_nil_values: true).keys.sort
    end

    def expected_keys
      @expected_keys ||= expected.to_h(reject_nil_values: true).keys.sort
    end

    def identical_keys?
      found_keys == expected_keys
    end

    def meta_message?
      found.instance_of?(Cucumber::Messages::Meta)
    end

    def errors
      @errors ||= []
    end
  end
end
