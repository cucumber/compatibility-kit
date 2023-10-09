# frozen_string_literal: true

require 'shared_examples'

module Cucumber::CompatibilityKit
  class << self
    def all_examples
      gherkin_examples + markdown_examples
    end

    def gherkin_examples
      Dir
        .entries(examples_path)
        .select do |file|
          folder = File.join(examples_path, file)

          file != '.' && file != '..' &&
            File.directory?(folder) &&
            gherkin_example?(folder)
        end
    end

    def markdown_examples
      Dir
      .entries(examples_path)
      .select do |file|
        folder = File.join(examples_path, file)

        file != '.' && file != '..' &&
          File.directory?(folder) &&
          markdown_example?(folder)
      end
    end

    def examples_path
      File.expand_path("#{File.dirname(__FILE__)}/../../features/")
    end

    def example_path(example_name)
      path = File.join(examples_path, example_name)

      return path if File.directory?(path)

      raise ArgumentError.new
    end

    private

    def gherkin_example?(example_folder)
      Dir.entries(example_folder).select { |file| File.extname(file) == '.feature' }.count > 0
    end

    def markdown_example?(example_folder)
      Dir.entries(example_folder).select { |file| File.extname(file) == '.md' }.count > 0
    end
  end
end
