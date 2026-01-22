# Cucumber Compatibility Kit

![Cucumber logo](https://raw.githubusercontent.com/cucumber/cucumber-js/46a5a78107be27e99c6e044c69b6e8f885ce456c/docs/images/logo.svg)

**Test data for validating compatibility of a Cucumber implementation**

[![nuget](https://img.shields.io/nuget/v/Cucumber.CCK.svg?color=dark-green)](https://www.nuget.org/packages/Cucumber.CCK)
[![build](https://github.com/cucumber/compatibility-kit/actions/workflows/test-dotnet.yml/badge.svg)](https://github.com/cucumber/compatibility-kit/actions/workflows/test-dotnet.yml)
[![backers](https://opencollective.com/cucumber/backers/badge.svg)](https://opencollective.com/cucumber)
[![sponsors](https://opencollective.com/cucumber/sponsors/badge.svg)](https://opencollective.com/cucumber)
[![docs](https://img.shields.io/badge/-docs-brightgreen?logo=cucumber&logoColor=bright%20green&labelColor=grey)](https://cucumber.io)

The CCK (Cucumber Compatibility Kit) is a set of features and messages. It aims to validate an implementation of the [Cucumber Messages protocol](https://github.com/cucumber/common/tree/main/messages#cucumber-messages).

## Overview

This kit (package) consists of a set of features, miscellaneous files, and messages:

- Each area will contain one or more features, which, once executed, will emit a set of messages as specified by the protocol.
- Some of these areas may "also" require miscellaneous files to be used when testing functions such as attaching images or documents or reading data from files.
- Each area will contain a set of messages - serialised as a single `.ndjson` file.

This is the reference for the CCK: a given feature from the kit, when executed using any dedicated step definitions, must emit a corresponding equivalent set of messages.

## Installation and Usage

Available as [`Cucumber.CCK`](https://www.nuget.org/packages/Cucumber.CCK/) on NuGet.

```console
dotnet add package Cucumber.CCK
```

Or via Package Manager Console:

```powershell
Install-Package Cucumber.CCK
```

The compatibility kit packages gherkin files and sample data as content files that are automatically copied to your output directory when you reference the package. The files will be available in the `cck/samples/` directory relative to your output folder.

## More Info

The Cucumber Compatibility Kit is part of the development tools of [Cucumber](https://cucumber.io). It helps ensure that all implementations are properly supporting our internal protocol and are compatible (and consistent) with each other and our common tools like the [html-formatter](https://github.com/cucumber/html-formatter).

It can be a valuable tool if you are developing integration with Cucumber or your own implementation of it.

Join us on [github/cucumber/compatibility-kit](https://github.com/cucumber/compatibility-kit) for more help if needed.

You can also take a look at [cucumber-ruby](https://github.com/cucumber/cucumber-ruby/blob/v9.2.0/compatibility/cck_spec.rb) to see how the kit is used in Ruby.

## Development

Before building this project locally, ensure the samples exist in the `devkit` directory at the root of the repository.

To build the NuGet package:

```console
cd dotnet/Cucumber.CCK
dotnet pack
```

The package will include all files from `../../devkit/samples` as contentFiles.