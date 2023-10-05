# frozen_string_literal: true

require 'rspec'
require 'cucumber/messages'
require_relative '../lib/keys_checker'

describe CCK::KeysChecker do
  describe '#compare' do
    let(:complete) { Cucumber::Messages::PickleStepArgument.new(doc_string: '1', data_table: '12') }
    let(:missing_data_table) { Cucumber::Messages::PickleStepArgument.new(doc_string: '1') }
    let(:missing_doc_string) { Cucumber::Messages::PickleStepArgument.new(data_table: '12') }
    let(:wrong_values) { Cucumber::Messages::PickleStepArgument.new(doc_string: '123', data_table: '456') }

    it 'finds missing key' do
      expect(described_class.compare(missing_data_table, complete)).to eq(
        ['Missing keys in message Cucumber::Messages::PickleStepArgument: [:data_table]']
      )
    end

    it 'finds extra keys' do
      expect(described_class.compare(complete, missing_doc_string)).to eq(
        ['Detected extra keys in message Cucumber::Messages::PickleStepArgument: [:doc_string]']
      )
    end

    it 'finds extra and missing' do
      expect(described_class.compare(missing_doc_string, missing_data_table)).to contain_exactly(
        'Missing keys in message Cucumber::Messages::PickleStepArgument: [:doc_string]',
        'Detected extra keys in message Cucumber::Messages::PickleStepArgument: [:data_table]'
      )
    end

    it 'does not care about the values' do
      expect(described_class.compare(complete, wrong_values)).to be_empty
    end

    context 'when default values are omitted' do
      let(:default_set) do
        Cucumber::Messages::Duration.new(
          seconds: 0,
          nanos: 12
        )
      end
      let(:default_not_set) { Cucumber::Messages::Duration.new(nanos: 12) }

      it 'does not raise an exception' do
        expect(described_class.compare(default_set, default_not_set)).to be_empty
      end
    end

    context 'when executed as part of a CI' do
      before { allow(ENV).to receive(:[]).with('CI').and_return(true) }

      it 'ignores actual CI related messages' do
        detected = Cucumber::Messages::Meta.new(ci: Cucumber::Messages::Ci.new(name: 'Some CI'))
        expected = Cucumber::Messages::Meta.new

        expect(described_class.compare(detected, expected)).to be_empty
      end
    end

    context 'when an unexpected error occurs' do
      it 'does not raise error' do
        expect { described_class.compare(nil, nil) }.not_to raise_error
      end

      it 'returns the error' do
        expect(described_class.compare(nil, nil))
          .to eq(['Unexpected error: wrong number of arguments (given 1, expected 0)'])
      end
    end
  end
end
