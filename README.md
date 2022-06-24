# Cucumber Compatibility Kit

The CCK - aka. Cucumber Compatibility Kit - is a set of features and Messages.

It aims to validate an implementation of the Cucumber Messages protocol.

For example, cucumber-ruby and cucumber-js are using it to make sure they emmit well-formed Messages when executing the features from the kit.

## Overview

The kit is composed of features, step definitions, and messages:

- features, once executed, emit an exhaustive set of Messages definfed by the protocol.
- step definitions allows to execute the features of the kit as expected.
- Messages - serialized as .ndjson files - are the reference: a given feature from the kit, executed using its dedicated step definitions, must emit the corresponding messages.

The Messages from the kit are generated using fake-cucumber, which is used here as a reference implementation of the Messages protocol.

## Contributing

This repo is composed of a devkit, and packages to deliver the kit using package managers like npm or rubygem.

### The devkit

The devkit is a set of tools to generate new Messages to extend the kit, or to update it after the protocol has been changed.

### The packages

At the moment, there are two packages: a NPM one, and a ruby gem.

The NPM package bundles nothing more than the compatibility kit with step definitions implemented in TypeScript.

The ruby gem, in addition of the kit and its step definitions written in ruby, also provides a few helpers to make it easier to work with the CCK.
