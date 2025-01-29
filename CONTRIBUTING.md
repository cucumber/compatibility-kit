# Contributing

This repo is composed of a [devkit](./devkit/), and packages to deliver the kit
using managers like NPM or rubygems.

## The devkit

The [devkit](./devkit/) is a set of tools to generate new Messages in order to
extend the kit, or to update it after the protocol has been changed.

## The packages

At the moment, there are two packages: a NPM one, and a Ruby gem.

- The [NPM package](./javascript/) bundles the features and NDJSON lines and expects step definitions
  implemented in TypeScript for whatever the consumer is
- The [Ruby gem](./ruby) bundles the features and NDJSON lines and expects step definitions
  implemented in Ruby for whatever the consumer is - it also provides a few helpers for the CCK
