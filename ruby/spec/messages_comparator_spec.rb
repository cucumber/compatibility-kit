# frozen_string_literal: true

require 'rspec'
require 'cucumber/messages'
require_relative '../lib/messages_comparator'

describe CCK::MessagesComparator do
  subject() { CCK::MessagesComparator }

  context 'when executed as part of a CI' do
    before do
      allow(ENV).to receive(:[]).with('CI').and_return(true)
    end

    it 'ignores extra found CI messages' do
      found_message_ci = Cucumber::Messages::Ci.new(name: 'Some CI')
      found_message_meta = Cucumber::Messages::Meta.new(ci: found_message_ci)
      found_message_envelope = Cucumber::Messages::Envelope.new(meta: found_message_meta)

      expected_message_meta = Cucumber::Messages::Meta.new()
      expected_message_envelope = Cucumber::Messages::Envelope.new(meta: expected_message_meta)

      comparator = subject.new(CCK::KeysChecker, [found_message_envelope], [expected_message_envelope])

      expect(comparator.errors).to be_empty
    end

    it 'ignores extra expected CI messages' do
      found_message_meta = Cucumber::Messages::Meta.new()
      found_message_envelope = Cucumber::Messages::Envelope.new(meta: found_message_meta)

      expected_message_ci = Cucumber::Messages::Ci.new(name: 'Some CI')
      expected_message_meta = Cucumber::Messages::Meta.new(ci: expected_message_ci)
      expected_message_envelope = Cucumber::Messages::Envelope.new(meta: expected_message_meta)

      comparator = subject.new(CCK::KeysChecker, [found_message_envelope], [expected_message_envelope])

      expect(comparator.errors).to be_empty
    end
  end
end
