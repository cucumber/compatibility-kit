# frozen_string_literal: true

require 'cucumber-compatibility-kit'

describe CCK::Examples do
  let(:features_path) { File.expand_path("#{File.dirname(__FILE__)}/../../features") }
  let(:gherkin_examples) do
    %w[
      attachments
      cdata
      data-tables
      examples-tables
      hooks
      minimal
      parameter-types
      pending
      retry
      rules
      skipped
      stack-traces
      undefined
      unknown-parameter-type
    ]
  end
  let(:markdown_examples) { ['markdown'] }

  describe '#feature_code_for' do
    context 'with an example that exists' do
      it 'returns the path of the folder containing the feature code for the example' do
        expect(described_class.feature_code_for('hooks')).to eq("#{features_path}/hooks")
      end
    end

    context 'with an example that does not exist' do
      it 'raises ArgumentError' do
        expect { described_class.feature_code_for('should-not-exists') }.to raise_error(ArgumentError)
      end
    end
  end

  describe '#gherkin' do
    it 'returns the list of gherkin examples' do
      expect(described_class.gherkin).to match_array(gherkin_examples)
    end
  end

  describe '#markdown' do
    it 'returns the list of markdown examples' do
      expect(described_class.markdown).to match_array(markdown_examples)
    end
  end

  describe '#all' do
    it 'returns the list of all available examples' do
      expect(described_class.all).to match_array(gherkin_examples + markdown_examples)
    end
  end
end
