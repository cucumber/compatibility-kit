# frozen_string_literal: true

module CCK
  module Examples
    class << self
      def gherkin
        Dir.entries(cck_features_folder_location).select do |file_or_folder|
          next if file_or_folder.start_with?('.')

          gherkin_example?(File.join(cck_features_folder_location, file_or_folder))
        end
      end

      def markdown
        Dir.entries(cck_features_folder_location).select do |file_or_folder|
          next if file_or_folder.start_with?('.')

          markdown_example?(File.join(cck_features_folder_location, file_or_folder))
        end
      end

      def feature_code_for(example_name)
        path = File.join(cck_features_folder_location, example_name)

        return path if File.directory?(path)

        raise ArgumentError, "No feature code directory found in gem for CCK example: #{example_name}"
      end

      private

      def cck_features_folder_location
        File.expand_path("#{File.dirname(__FILE__)}/../../features/")
      end

      def gherkin_example?(example_folder)
        file_type_in_folder?('.feature', example_folder)
      end

      def markdown_example?(example_folder)
        file_type_in_folder?('.md', example_folder)
      end

      def file_type_in_folder?(extension, folder)
        Dir.entries(folder).any? { |file| File.extname(file) == extension }
      end
    end
  end
end
