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
      found_keys = found.to_h(reject_nil_values: true).keys
      expected_keys = expected.to_h(reject_nil_values: true).keys

      return errors if found_keys.sort == expected_keys.sort

      missing_keys = (expected_keys - found_keys).reject do |key|
        found.instance_of?(Cucumber::Messages::Meta) && key == :ci
      end

      extra_keys = (found_keys - expected_keys).reject do |key|
        found.instance_of?(Cucumber::Messages::Meta) && key == :ci
      end

      errors << "Found extra keys in message #{found.class.name}: #{extra_keys}" unless extra_keys.empty?
      errors << "Missing keys in message #{found.class.name}: #{missing_keys}" unless missing_keys.empty?
      errors
    rescue StandardError => e
      ["Unexpected error: #{e.message}"]
    end

    private

    def errors
      @errors ||= []
    end
  end
end
