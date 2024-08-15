# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name        = 'cucumber-compatibility-kit'
  s.version     = File.read(File.expand_path('VERSION', __dir__)).strip
  s.authors     = ['Aurélien Reeves', 'Aslak Hellesøy', 'Vincent Prêtre', 'Luke Hill', 'Cucumber Ltd']
  s.description = 'Kit to check compatibility with official cucumber ruby implementation'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukebot@cucumber.io'
  s.homepage    = 'https://github.com/cucumber/compatibility-kit'
  s.platform    = Gem::Platform::RUBY
  s.license     = 'MIT'
  s.required_ruby_version = '>= 3.0'
  s.required_rubygems_version = '>= 3.2.8'

  s.metadata = {
    'bug_tracker_uri' => 'https://github.com/cucumber/compatibility-kit/issues',
    'changelog_uri' => 'https://github.com/cucumber/compatibility-kit/blob/main/compatibility-kit/CHANGELOG.md',
    'documentation_uri' => 'https://cucumber.io/docs/gherkin/',
    'mailing_list_uri' => 'https://groups.google.com/forum/#!forum/cukes',
    'source_code_uri' => 'https://github.com/cucumber/compatibility-kit/blob/main/ruby'
  }

  s.add_dependency 'cucumber-messages', '> 20', '< 28'

  s.add_development_dependency 'rspec', '~> 3.13'
  s.add_development_dependency 'rubocop', '~> 1.64.1'
  s.add_development_dependency 'rubocop-performance', '~> 1.21.1'
  s.add_development_dependency 'rubocop-rspec', '~> 3.0.2'

  s.files            = Dir['README.md', 'LICENSE', 'lib/**/*', 'features/**/*']
  s.rdoc_options     = ['--charset=UTF-8']
  s.require_path     = 'lib'
end
