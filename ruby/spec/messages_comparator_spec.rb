# frozen_string_literal: true

require 'rspec'
require 'cucumber/messages'
require_relative '../lib/messages_comparator'

describe CCK::MessagesComparator do
  subject() { described_class }

  context 'when executed as part of a CI' do
    before do
      allow(ENV).to receive(:[]).with('CI').and_return(true)
    end

    it 'ignores any detected CI messages' do
      detected_message_ci = Cucumber::Messages::Ci.new(name: 'Some CI')
      detected_message_meta = Cucumber::Messages::Meta.new(ci: detected_message_ci)
      detected_message_envelope = Cucumber::Messages::Envelope.new(meta: detected_message_meta)

      expected_message_meta = Cucumber::Messages::Meta.new()
      expected_message_envelope = Cucumber::Messages::Envelope.new(meta: expected_message_meta)

      comparator = subject.new(CCK::KeysChecker, [detected_message_envelope], [expected_message_envelope])

      expect(comparator.errors).to be_empty
    end

    it 'ignores any expected CI messages' do
      detected_message_meta = Cucumber::Messages::Meta.new()
      detected_message_envelope = Cucumber::Messages::Envelope.new(meta: detected_message_meta)

      expected_message_ci = Cucumber::Messages::Ci.new(name: 'Some CI')
      expected_message_meta = Cucumber::Messages::Meta.new(ci: expected_message_ci)
      expected_message_envelope = Cucumber::Messages::Envelope.new(meta: expected_message_meta)

      comparator = subject.new(CCK::KeysChecker, [detected_message_envelope], [expected_message_envelope])

      expect(comparator.errors).to be_empty
    end
  end
end
