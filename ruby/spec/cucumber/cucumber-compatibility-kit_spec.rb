# frozen_string_literal: true

require 'cucumber-compatibility-kit'

describe Cucumber::CompatibilityKit do
  let(:features_path) { File.expand_path("#{File.dirname(__FILE__)}/../../features") }
  let(:gherkin_examples) do
    [
      'attachments',
      'cdata',
      'data-tables',
      'examples-tables',
      'hooks',
      'minimal',
      'parameter-types',
      'pending',
      'retry',
      'rules',
      'skipped',
      'stack-traces',
      'undefined',
      'unknown-parameter-type'
    ]
  end
  let(:markdown_examples) { ['markdown'] }

  describe '#examples_path' do
    it 'returns the path of the features folder' do
      expect(described_class.examples_path).to eq(features_path)
    end
  end

  describe '#example_path' do
    context 'with an existing example' do
      it 'returns the path of the folder of the example' do
        expect(described_class.example_path('hooks')).to eq("#{features_path}/hooks")
      end
    end

    context 'with an non-existent example' do
      it 'raises ArgumentError' do
        expect { described_class.example_path('should-not-exists') }.to raise_error(ArgumentError)
      end
    end
  end

  describe '#gherkin_examples' do
    it 'returns the list of gherkin examples' do
      expect(described_class.gherkin_examples).to match_array(gherkin_examples)
    end
  end

  describe '#markdown_examples' do
    it 'returns the list of markdown examples' do
      expect(described_class.markdown_examples).to match_array(markdown_examples)
    end
  end

  describe '#all_examples' do
    it 'returns the list of all available examples' do
      expect(described_class.all_examples)
        .to match_array(gherkin_examples + markdown_examples)
    end
  end
end
