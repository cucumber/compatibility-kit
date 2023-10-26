# frozen_string_literal: true

require 'shared_examples'

module Cucumber
  module CompatibilityKit
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

        raise ArgumentError
      end

      private

      def gherkin_example?(example_folder)
        files_types_in_folder('.feature', example_folder)
      end

      def markdown_example?(example_folder)
        files_types_in_folder('.md', example_folder)
      end

      def files_types_in_folder(extension, folder)
        Dir.entries(folder).any? { |file| File.extname(file) == extension }
      end
    end
  end
end
