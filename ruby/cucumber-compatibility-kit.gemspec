# frozen_string_literal: true

version = File.read(File.expand_path('VERSION', __dir__)).strip

Gem::Specification.new do |s|
  s.name        = 'cucumber-compatibility-kit'
  s.version     = version
  s.authors     = ['Aurélien Reeves', 'Aslak Hellesøy', 'Vincent Prêtre', 'Cucumber Ltd']
  s.description = 'Kit to check compatibility with official cucumber implementation'
  s.summary     = "#{s.name}-#{s.version}"
  s.email       = 'cukebot@cucumber.io'
  s.homepage    = 'https://github.com/cucumber/compatibility-kit'
  s.platform    = Gem::Platform::RUBY
  s.license     = 'MIT'
  s.required_ruby_version = '>= 2.6'
  s.required_rubygems_version = '>= 3.0.9'

  s.metadata = {
    'bug_tracker_uri' => 'https://github.com/cucumber/compatibility-kit/issues',
    'changelog_uri' => 'https://github.com/cucumber/compatibility-kit/blob/main/compatibility-kit/CHANGELOG.md',
    'documentation_uri' => 'https://cucumber.io/docs/gherkin/',
    'mailing_list_uri' => 'https://groups.google.com/forum/#!forum/cukes',
    'source_code_uri' => 'https://github.com/cucumber/compatibility-kit/blob/main/ruby'
  }

  s.add_dependency 'cucumber-messages', '> 20', '< 25'
  s.add_dependency 'rspec', '~> 3.12'

  s.add_development_dependency 'rubocop', '~> 1.50.2'
  s.add_development_dependency 'rubocop-performance', '~> 1.17.1'
  s.add_development_dependency 'rubocop-rspec', '~> 2.20.0'

  s.files            = Dir['README.md', 'LICENSE', 'lib/**/*', 'features/**/*']
  s.rdoc_options     = ['--charset=UTF-8']
  s.require_path     = 'lib'
end
