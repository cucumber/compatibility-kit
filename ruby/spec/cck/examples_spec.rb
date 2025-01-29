# frozen_string_literal: true

require 'cck/examples'

describe CCK::Examples do
  let(:features_path) { File.expand_path("#{File.dirname(__FILE__)}/../../features") }
  let(:gherkin_examples) do
    %w[
      attachments
      cdata
      data-tables
      empty
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

  describe '#feature_code_for' do
    context 'with an example that exists' do
      it 'returns the path of the folder containing the feature code for the example' do
        expect(described_class.feature_code_for('hooks')).to eq("#{features_path}/hooks")
      end
    end

    context 'with an example that does not exist' do
      it 'raises an ArgumentError' do
        expect { described_class.feature_code_for('nonexistent-example') }
          .to raise_error(ArgumentError)
          .with_message('No feature code directory found in gem for CCK example: nonexistent-example')
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
      expect(described_class.markdown).to eq(['markdown'])
    end
  end
end
