# The Cucumber Compatibility Kit for Ruby

The CCK - aka. Cucumber Compatibility Kit - is a set of features and Messages.
It aims to validate an implementation of the
[Cucumber Messages protocol](https://github.com/cucumber/common/tree/main/messages#cucumber-messages).

## Overview

This kit (gem), consists of a set of features, miscellaneous files and messages:

- Each area will contain one feature, which, once executed, will emit an exhaustive set of messages
as specified by the protocol
- Some of these areas may "also" require miscellaneous files to be used when testing functions
such as attaching images or documents or reading data from files
- Each area will contain a set of messages - serialized as a single `.ndjson` file
This is the reference for the CCK, that a given feature from the kit, when executed using any dedicated
step definitions, must emit the **exact** corresponding messages

## Installation and Usage

Add `cucumber-compatibility-kit` to your `Gemfile` as a development dependency, and
install it:

    bundle install

Then add a spec that could look like this:

```ruby
# spec/my_compatibility_checks_spec.rb
require 'cucumber/compatibility_kit'

describe Cucumber::CompatibilityKit, type: :feature do
  let(:cucumber_command) { 'bundle exec cucumber --publish-quiet --profile none --format message' }

  # Don't run the retry or skipped CCK Examples (For whatever reason)
  examples = Cucumber::CompatibilityKit.gherkin.reject { |example| example == 'retry' || example == 'skipped' }

  examples.each do |example_name|
    describe "'#{example_name}' example" do
      include_examples 'cucumber compatibility kit' do
        let(:example) { example_name }
        # You will need to specify the relative support code and cck paths
        let(:messages) { `#{cucumber_command} --require #{support_code_path} #{cck_path}` }
      end
    end
  end
end
```

`CucumberCompatibilityKit.gherkin` will return an array that lists all the gherkin examples available within the CCK.
Here, we want to execute all of them except the `retry` and `skipped` ones (For whatever reason).

`let(:messages)` will execute the cucumber command. As we are using the `message` formatter, `messages` will
then contain the messages as a `ndjson` document with one message per line.

You can use `gem open cucumber-compatibility-kit` in order to take a look at the features and the
expected messages they should produce. They are available in the `features` folder within the gem.

## More info

The Cucumber Compatibility Kit is part of the development tools of [Cucumber](https://cucumber.io).
It allows us to make sure that all our implementations are properly supporting our internal protocol
and thus are compatible (and consistent), with each other and our common tools like the [html-formatter](https://github.com/cucumber/html-formatter).

It can be a valuable tool if you are developing integration with cucumber, or your own implementation of it.

Join us on [github/cucumber/compatibility-kit](https://github.com/cucumber/compatibility-kit)
to get more help if you need to.

You can also take a look on [cucumber-ruby](https://github.com/cucumber/cucumber-ruby/blob/v9.2.0/compatibility/cck_spec.rb)
to see how the kit is used there.

## Development

Before building this project locally, the samples must be copied from the `devkit`. Use: 

```
cd ../devkit
npm ci && npm run copy-to:ruby
cd ../ruby
```
