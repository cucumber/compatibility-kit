<h1 align="center">
  <img src="https://raw.githubusercontent.com/cucumber/cucumber-js/46a5a78107be27e99c6e044c69b6e8f885ce456c/docs/images/logo.svg" alt="Cucumber logo" width="75">
  <br>
  Cucumber Compatibility Kit
</h1>
<p align="center">
  <b>Test data for validating compatibility of a Cucumber implementation</b>
</p>

<p align="center">
  <a href="https://pypi.python.org/pypi/cucumber-tag-expressions">
    <img src="https://img.shields.io/pypi/v/cucumber-compatibility-kit.svg?color=dark-green" alt="npm">
  </a>
  <a href="https://github.com/cucumber/compatibility-kit/actions/workflows/test-python.yml">
    <img src="https://github.com/cucumber/compatibility-kit/actions/workflows/test-python.yml/badge.svg" alt="build">
  </a>
  <a href="https://opencollective.com/cucumber">
    <img src="https://opencollective.com/cucumber/backers/badge.svg" alt="backers">
  </a>
  <a href="https://opencollective.com/cucumber">
    <img src="https://opencollective.com/cucumber/sponsors/badge.svg" alt="sponsors">
  </a>
  <a href="https://cucumber.io">
    <img src="https://img.shields.io/badge/-docs-brightgreen?logo=cucumber&logoColor=bright%20green&labelColor=grey" alt="build">
  </a>
</p>

The CCK (Cucumber Compatibility Kit) is a set of features and messages. It aims to validate an implementation of the [Cucumber Messages protocol](https://github.com/cucumber/common/tree/main/messages#cucumber-messages).

## Overview

This kit (package) consists of a set of features, miscellaneous files, and messages:

- Each area will contain one feature, which, once executed, will emit an exhaustive set of messages as specified by the protocol.
- Some of these areas may "also" require miscellaneous files to be used when testing functions such as attaching images or documents or reading data from files.
- Each area will contain a set of messages - serialised as a single `.ndjson` file.

This is the reference for the CCK: a given feature from the kit, when executed using any dedicated step definitions, must emit the **exact** corresponding messages.

## Installation and Usage

Available as [`cucumber-compatibility-kit`](https://pypi.org/project/cucumber-compatibility-kit/) on PyPI.

```console
pip install cucumber-compatibility-kit
```

The compatibility kit packages gherkin files within a `features/` directory, that can be accessed over a Python interface.

```python
>>> from cucumber_compatibility_kit import CompatibilityKit
>>> cck = CompatibilityKit()

# Access all samples paths containing feature files
>>> cck.gherkin()
[Path('/path/to/features/ambiguous'), ..., Path('/path/to/features/unused-steps')]

# Access the samples path for a feature code
>>> cck.feature_code_for("ambiguous")
Path('/path/to/features/ambiguous')

# Directory contains a feature file
>>> from pathlib import Path
>>> cck.(Path('/path/to/features/ambiguous'))
True
```

More detailed documentation will be defined ([#193](https://github.com/cucumber/compatibility-kit/issues/193)).

## More Info

The Cucumber Compatibility Kit is part of the development tools of [Cucumber](https://cucumber.io). It helps ensure that all implementations are properly supporting our internal protocol and are compatible (and consistent) with each other and our common tools like the [html-formatter](https://github.com/cucumber/html-formatter).

It can be a valuable tool if you are developing integration with Cucumber or your own implementation of it.

Join us on [github/cucumber/compatibility-kit](https://github.com/cucumber/compatibility-kit) for more help if needed.

You can also take a look at [cucumber-ruby](https://github.com/cucumber/cucumber-ruby/blob/v9.2.0/compatibility/cck_spec.rb) to see how the kit is used in Ruby.

## Development

Before building this project locally, the samples must be copied from the `devkit`.

```console
cd ../devkit
npm ci && npm run copy-to:python
cd ../python
```
