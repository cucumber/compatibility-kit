# frozen_string_literal: true

require 'rspec'
require 'cucumber/messages'
require_relative '../../lib/messages_comparator'

describe CCK::MessagesComparator do
  context 'when executed as part of a CI' do
    before { allow(ENV).to receive(:[]).with('CI').and_return(true) }

    let(:ci_message) { Cucumber::Messages::Ci.new(name: 'Some CI') }
    let(:blank_meta_message) { Cucumber::Messages::Meta.new }
    let(:ci_message_envelope) { Cucumber::Messages::Envelope.new(meta: ci_message) }
    let(:meta_message_envelope) { Cucumber::Messages::Envelope.new(meta: blank_meta_message) }

    it 'ignores any detected CI messages' do
      detected_message_meta = Cucumber::Messages::Meta.new(ci: ci_message)
      detected_message_envelope = Cucumber::Messages::Envelope.new(meta: detected_message_meta)
      comparator = described_class.new(CCK::KeysChecker, [detected_message_envelope], [meta_message_envelope])

      expect(comparator.errors).to be_empty
    end

    it 'ignores any expected CI messages' do
      expected_message_meta = Cucumber::Messages::Meta.new(ci: ci_message)
      expected_message_envelope = Cucumber::Messages::Envelope.new(meta: expected_message_meta)
      comparator = described_class.new(CCK::KeysChecker, [meta_message_envelope], [expected_message_envelope])

      expect(comparator.errors).to be_empty
    end
  end
end
