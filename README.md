# Cucumber Compatibility Kit

The CCK - aka. Cucumber Compatibility Kit - is a set of features and Messages.
It aims to validate an implementation of the
[Cucumber Messages protocol](https://github.com/cucumber/common/tree/main/messages#cucumber-messages).

For example, [cucumber-ruby](https://github.com/cucumber/cucumber-ruby/blob/main/spec/cck/cck_spec.rb)
and [cucumber-js](https://github.com/cucumber/cucumber-js/blob/main/compatibility/cck_spec.ts)
are using it to make sure they emmit well-formed Messages when executing the
features from the kit.

## Overview

The kit is composed of features, step definitions, and messages:

- features, once executed, emit an exhaustive set of Messages as specified by
  the protocol
- step definitions allows to execute the features of the kit as expected
- Messages - serialized as `.ndjson` files - are the reference: a given feature
  from the kit, executed using its dedicated step definitions, must emit the
  corresponding Messages

The Messages from the kit are generated using
[fake-cucumber](https://github.com/cucumber/fake-cucumber), which is used here
as a reference implementation of the Messages protocol.

## Contributing

This repo is composed of a [devkit](./devkit/), and packages to deliver the kit
using managers like NPM or rubygem.

### The devkit

The [devkit](./devkit/) is a set of tools to generate new Messages in order to
extend the kit, or to update it after the protocol has been changed.

### The packages

At the moment, there are two packages: a NPM one, and a ruby gem.

- the [NPM package](./javascript/) bundles the kit with step definitions
  implemented in TypeScript.
- the [ruby gem](./ruby), in addition of the kit and its step definitions
  written in ruby, also provides a few helpers to make it easier to work with
  the CCK.
