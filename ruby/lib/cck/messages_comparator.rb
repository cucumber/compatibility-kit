# frozen_string_literal: true

require_relative 'keys_checker'
require_relative 'helpers'

module CCK
  class MessagesComparator
    include Helpers

    def initialize(validator, detected, expected)
      @all_errors = []
      @compared = []
      @validator = validator

      compare(detected, expected)
    end

    def errors
      @all_errors.flatten
    end

    private

    def compare(detected, expected)
      detected_by_type = messages_by_type(detected)
      expected_by_type = messages_by_type(expected)

      detected_by_type.keys.each do |type|
        compare_list(detected_by_type[type], expected_by_type[type])
      rescue StandardError => e
        @all_errors << "Error while comparing #{type}: #{e.message}"
      end
    end

    def messages_by_type(messages)
      by_type = Hash.new { |h, k| h[k] = [] }
      messages.each do |msg|
        by_type[message_type(msg)] << remove_envelope(msg)
      end
      by_type
    end

    def remove_envelope(message)
      message.send(message_type(message))
    end

    def compare_list(detected, expected)
      detected.each_with_index do |message, index|
        compare_message(message, expected[index])
      end
    end

    def compare_message(detected, expected)
      return if not_message?(detected)
      return if ignorable_large_message?(detected)
      return if ignorable_time_message?(detected, expected)
      return if ci_message?(detected, expected)
      return if git_message?(detected, expected)

      @compared << detected.class.name
      @all_errors << @validator.compare(detected, expected)
      compare_sub_messages(detected, expected)
    end

    def not_message?(detected)
      !detected.is_a?(Cucumber::Messages::Message)
    end

    def ignorable_large_message?(detected)
      detected.is_a?(Cucumber::Messages::GherkinDocument) || detected.is_a?(Cucumber::Messages::Pickle)
    end

    def ignorable_time_message?(detected, expected)
      (detected.is_a?(Cucumber::Messages::Timestamp) && expected.is_a?(Cucumber::Messages::Timestamp)) ||
        (detected.is_a?(Cucumber::Messages::Duration) && expected.is_a?(Cucumber::Messages::Duration))
    end

    def ci_message?(detected, expected)
      ENV['CI'] && detected.is_a?(Cucumber::Messages::Ci) && expected.nil?
    end

    def git_message?(detected, _expected)
      detected.is_a?(Cucumber::Messages::Git)
    end

    def compare_sub_messages(detected, expected)
      return unless expected.respond_to? :to_h
      expected.to_h.keys.each do |key|
        value = expected.send(key)
        if value.is_a?(Array)
          compare_list(detected.send(key), value)
        else
          compare_message(detected.send(key), value)
        end
      end
    end
  end
end
