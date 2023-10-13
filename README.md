# Cucumber Compatibility Kit

The Cucumber Compatibility Kit (CCK) aims to validate a Cucumber implementation's support for the
[Cucumber Messages protocol](https://github.com/cucumber/messages).

For example, [cucumber-ruby](https://github.com/cucumber/cucumber-ruby/blob/main/spec/cck/cck_spec.rb)
and [cucumber-js](https://github.com/cucumber/cucumber-js/blob/main/compatibility/cck_spec.ts)
are using it to make sure they emit well-formed Messages when executing the
features from the kit.

## Overview

The kit is composed of features, step definitions, and messages:

- **features**, once executed, emit an exhaustive set of Messages as specified by the protocol
- **step definitions** that are used in conjunction with the features to generate the Messages, and also serve as reference step definitions for implementations adopting the kit
- **Messages**, serialized as `.ndjson` files, are the reference: a given feature
  from the kit, executed using its dedicated step definitions, **must** emit the
  corresponding Messages

The Messages from the kit are generated using
[fake-cucumber](https://github.com/cucumber/fake-cucumber), which is used here
as a reference implementation of the Messages protocol.

## Adoption

To adopt the compatibility kit when writing a Cucumber implementation, an implementer must have some prerequisites, do some setup in the implementation project and then write a dynamic test that is fed by the kit.

### Prerequisites

First, make sure your implementation is sufficiently testable - you should be able to execute a test run programatically for a given set of feature files and step definitions, and obtain the Messages output (via a formatter or some other means) to make assertions on.

### Setup

Pull in the latest version of the CCK package for your platform. If there isn't one yet, consider just copying over the files you need from the [devkit](./devkit/) for now - you can figure out the publishing later once it's all working.

Next, for each feature in the CCK suite, write step definitions that work with your implementation - these should be _equivalent_ to the reference step definitions from the devkit, but with the appropriate language, syntax etc.

### Testing

Now you can build your CCK test. For each feature in the CCK suite, it should:

1. Execute a test run, scoped to:
  - Only the feature file in question
  - Only the step definition file that you wrote for this feature
2. Capture the Messages output of that test run
3. Load the reference messages from the `.ndjson` file and assert that the output you captured matches it

### Notes and exceptions

When we say "matches" above, that's heavily qualified - there are many individual fields that will vary from run to run, like generated identifiers, timestamps, durations and file URLs. You can freely exclude these fields from your assertion - the key thing to capture is the number, type and order of the messages, and the content that would be consistent across runs. It's also not unheard of for implementations to fix up the order of messages so it matches the CCK, although it's best to try to match it naturally if you can.

Bear in mind that if you, for example, omit or mis-type a step definition, the failure you get might be non-obvious e.g. a discrepancy between actual and expected messages. Many of the features in the CCK represent a test run that fails, so this is not something that should cause your test to fail, although you might find it useful to capture the stderr (or equivalent) output for debugging purposes.

A small minority of features also have an `.arguments.txt` that specify additional arguments/options that are pertinent to the feature - see `retry` for an example. You can adapt these how you see fit - they may or may not line up directly with your CLI options schema.

There may be some features in the CCK suite that cover functionality that your implementation doesn't have. For example, there's one for `retry` which only a subset of Cucumber implementations support. You can filter these out of your test until/unless you're ready to support them.

### Existing implementations

- [cucumber-js](https://github.com/cucumber/cucumber-js/tree/main/compatibility)
- [cucumber-jvm](https://github.com/cucumber/cucumber-jvm/tree/main/compatibility)
- cucumber-ruby. Contained herein. Will be ported at a later date
