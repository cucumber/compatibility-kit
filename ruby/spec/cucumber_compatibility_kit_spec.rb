# frozen_string_literal: true

require 'cucumber_compatibility_kit'

describe CucumberCompatibilityKit do
  let(:features_path) { File.expand_path("#{File.dirname(__FILE__)}/../features") }

  describe '.feature_code_for' do
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

  describe '.gherkin' do
    it 'returns the list of gherkin examples' do
      # Maintaining this list is cumbersome, so we just include a few here
      expect(described_class.gherkin).to include(*%w[attachments empty examples-tables hooks minimal rules])
    end
  end

  describe '.markdown' do
    it 'returns the list of markdown examples' do
      expect(described_class.markdown).to eq(['markdown'])
    end
  end
end
