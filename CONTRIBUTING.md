# Contributing

This repo is composed of a [devkit](./devkit/), and packages to deliver the kit
using managers like NPM or rubygems.

## The devkit

The [devkit](./devkit/) is a set of tools to generate new Messages in order to
extend the kit, or to update it after the protocol has been changed.

## The packages

At the moment, there are two packages: a npm one, and a ruby gem.

- the [npm package](./javascript/) bundles the kit with step definitions
  implemented in TypeScript.
- the [ruby gem](./ruby), in addition of the kit and its step definitions
  written in ruby, also provides a few helpers to make it easier to work with
  the CCK.
