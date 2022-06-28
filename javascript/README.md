# Cucumber Compatibility Kit

The CCK - aka. Cucumber Compatibility Kit - is a set of features and Messages.
It aims to validate an implementation of the
[Cucumber Messages protocol](https://github.com/cucumber/common/tree/main/messages#cucumber-messages).

## Overview

The kit is composed of features and messages:

- features, once executed, emit an exhaustive set of Messages as specified by
  the protocol
- Messages - serialized as `.ndjson` files - are the reference: a given feature
  from the kit, executed using its dedicated step definitions, must emit the
  corresponding Messages

## Getting Started

After running `npm install --save-dev @cucumber/compatibility-kit`, the kit is
available in your `node_modules` in `node_modules/@cucumber/compatibility-kit/features`.

You will find there some folders. Each folder owns a feature with its corresponding Messages.

### The features

You can execute the features with your implementation. For example with cucumber, it
would look like the following:

    npx cucumber-js node_modules/@cucumber/compatibility-kit/features/**/*.feature

Here's we have been able to run our features. However it did not find the step
definitions. It is up to you to implement your step definitions compatible
with your own tool.

In order to make some experiments, the kit comes with step definitions compatible with
[fake-cucumber](https://github.com/cucumber/fake-cucumber) and written using TypeScript.
You will find also a few assets which may be required for some features. For example,
the `attachments` feature is using an asset `cucumber.png` to test the possibility
to attach images to the Messages.

### The Messages

Each feature available in the kit comes with a `.ndjson`. That file is the expected
Messages related the execution of the corresopnding feature. For convenience, the
messages are serialized using the [ndjson](http://ndjson.org/) format.

The idea is to execute the features of the kit using your tool, to generate the
corresponding messages, and to compare your messages with the ones from the kit.

## More info

The Cucumber Compatibility Kit is part of the development tools of [Cucumber](https://cucumber.io).
It allows us to make sure that all our implementations are properly supporting our internal protocol
and thus are compabitle with each other and with our common tools like the [html-formatter](https://github.com/cucumber/html-formatter).

It can be a valuable tool if you are developing integration with cucumber, or your
own implementation of it.

Join us on [github/cucumber/compatibility-kit](https://github.com/cucumber/compatibility-kit)
to get more help if you need to.

You can also take a look on [cucumber-js](https://github.com/cucumber/cucumber-js/blob/v8.3.1/compatibility/cck_spec.ts)
to see how the kit is used there.
