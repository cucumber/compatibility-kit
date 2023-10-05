# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- [Ruby] Initial rubocop gems and basic compliance added (More work to come) ([#49](https://github.com/cucumber/compatibility-kit/pull/49))

### Changed
- [Ruby] Minimum ruby version is now bumped from 2.3 to 2.5 ([#47](https://github.com/cucumber/compatibility-kit/pull/47))
- [Ruby] Refactored `KeysChecker#compare` to be a lot less complex and slightly more performant ([#51](https://github.com/cucumber/compatibility-kit/pull/51))

### Fixed
- [Ruby] The `meta` key was being erroneously checked when running CCK tests ([#43](https://github.com/cucumber/compatibility-kit/pull/43))
- [Ruby] All messages were being analysed as `attachment` when running CCK tests ([#45](https://github.com/cucumber/compatibility-kit/pull/45))
- [Ruby] Added in missing step definition for `Attaching a document with a filename` ([#48](https://github.com/cucumber/compatibility-kit/pull/48))
  - NB: This is currently not "permissible" in the ruby flavour of cucumber, but will be enabled shortly

## [12.0.0] - 2023-07-08
### Changed
- Add scenario for attached document with filename ([#35](https://github.com/cucumber/compatibility-kit/pull/35))

## [11.3.0] - 2023-05-13
### Changed
- Updated reference data to include `sourceReference` on `parameterType` messages ([#33](https://github.com/cucumber/compatibility-kit/pull/33))

## [11.2.0] - 2022-12-23
### Changed
- [Ruby] Update cucumber-messages requirement from `~> 19.1, >= 19.1.2` to `>= 19.1.2, < 22.0` ([#28](https://github.com/cucumber/compatibility-kit/pull/28))

## [11.1.0] - 2022-12-17
### Added
- cdata feature has been added ([#24](https://github.com/cucumber/compatibility-kit/pull/24))

### Changed
- All tests now pick up exception messages provided from latest version of cucumber-messages [#27](https://github.com/cucumber/compatibility-kit/pull/27)

## [11.0.1] - 2022-07-11
### Fixed
- `body` was sometime missing in `attachments.feature.ndjson` ([#17](https://github.com/cucumber/compatibility-kit/pull/17))
- Fix messages for `retry.feature.ndjson` to include multiple attempts ([#18](https://github.com/cucumber/compatibility-kit/pull/18))

## [11.0.0] - 2022-06-28
### Added
- Fake CI data in messages have been added back to the samples ndjson ([#9](https://github.com/cucumber/compatibility-kit/pull/9))

### Changed
- Creation of a devkit, impacting step definition messages: URI are now beginning with `samples` and not `features` [#4](https://github.com/cucumber/compatibility-kit/pull/4)
- [JavaScript] Remove all dependencies from the package ([#8](https://github.com/cucumber/compatibility-kit/pull/8))

## [10.0.0] - 2022-06-09
### Changed
- Update the ndjson files in the kit using `fake-cucumber` 16.0.0 to bring new keyword types to steps and pickles (refs. [#1966](https://github.com/cucumber/common/pull/1966) [#1741](https://github.com/cucumber/common/pull/1741))

## [9.2.1] - 2022-05-19
### Fixed
- [Ruby] Add implementation for named hooks ([#1984](https://github.com/cucumber/common/pull/1984))

## [9.2.0] - 2022-04-01
### Added
- Add a named hooked case to the Hooks suite ([#1914](https://github.com/cucumber/common/pull/1914))

## [9.1.2] - 2021-10-20
### Fixed
- [Ruby] Fix the `Skipped` support code to match the JavaScript implementation ([#1805](https://github.com/cucumber/common/pull/1805))

## [9.1.1] - 2021-10-19
### Fixed
- [Ruby] Ignores messages related to an actual CI ([#1803](https://github.com/cucumber/common/pull/1803))

## [9.1.0] - 2021-10-19
### Added
- [Ruby] The compatibility kit is now available for Ruby as a gem ([#1773](https://github.com/cucumber/common/pull/1773))

## [9.0.0] - 2021-10-01
### Changed
- Pending results are now properly reported as failures ([#1751](https://github.com/cucumber/common/pull/1751))

## [8.0.0] - 2021-09-02
### Added
- Features for pending steps, skipped scenarios and undefined steps

### Changed
- Upgrade to `@cucumber/messages` `17.1.0`
- Upgrade to `@cucumber/gherkin` `21.0.0`

## [7.1.0] - 2021-07-08
### Added
- Added Examples to the attachments feature to generate messages for fixing [#1173](https://github.com/cucumber/common/issues/1173)
- Added `retry` feature to validate Retry behaviour in implementations that have it ([#1631](https://github.com/cucumber/common/pull/1631))
- Added mechanism to optionally specify CLI options for `fake-cucumber` per feature

## [7.0.0] - 2021-05-26
### Changed
- Changed the `markdown.feature.md` feature and associated stepdefs

## [6.0.0] - 2021-05-24
### Changed
- Use `.feature.md` extension for Markdown files

## [5.0.1] - 2021-05-18
### Fixed
- Fixed statuses in some message streams, leveraging a bugfix in `@cucumber/fake-cucumber` 12.0.2

## [5.0.0] - 2021-05-17
### Changed
- Upgrade to gherkin 19.0.0
- Upgrade to messages 16.0.0

## [4.0.1] - 2021-04-06
### Fixed
- Make the package public again ([#1454](https://github.com/cucumber/cucumber/pull/1454))

## [4.0.0] - 2021-03-29
### Changed
- Upgrade to gherkin 18.0.0
- Upgrade to messages 15.0.0

## [3.0.0] - 2021-02-07
### Changed
- Upgrade to gherkin 17.0.0
- Upgrade to messages 14.0.0

## [2.0.0] - 2020-08-10
### Changed
- Upgrade `messages` to `13.0.1`

## [1.0.0] - 2020-01-10
### Added
- First release

[Unreleased]: https://github.com/cucumber/compatibility-kit/compare/v12.0.0...main
[12.0.0]: https://github.com/cucumber/compatibility-kit/compare/v11.3.0...v12.0.0
[11.3.0]: https://github.com/cucumber/compatibility-kit/compare/v11.2.0...v11.3.0
[11.2.0]: https://github.com/cucumber/compatibility-kit/compare/v11.1.0...v11.2.0
[11.1.0]: https://github.com/cucumber/compatibility-kit/compare/v11.0.1...v11.1.0
[11.0.1]: https://github.com/cucumber/compatibility-kit/compare/v11.0.0...v11.0.1
[11.0.0]: https://github.com/cucumber/compatibility-kit/compare/v10.0.0...v11.0.0
[10.0.0]: https://github.com/cucumber/compatibility-kit/compare/v9.2.1...v10.0.0
[9.2.1]: https://github.com/cucumber/compatibility-kit/compare/v9.2.0...v9.2.1
[9.2.0]: https://github.com/cucumber/compatibility-kit/compare/v9.1.2...v9.2.0
[9.1.2]: https://github.com/cucumber/compatibility-kit/compare/v9.1.1...v9.1.2
[9.1.1]: https://github.com/cucumber/compatibility-kit/compare/v9.1.0...v9.1.1
[9.1.0]: https://github.com/cucumber/compatibility-kit/compare/v9.0.0...v9.1.0
[9.0.0]: https://github.com/cucumber/compatibility-kit/compare/v8.0.0...v9.0.0
[8.0.0]: https://github.com/cucumber/compatibility-kit/compare/v7.1.0...v8.0.0
[7.1.0]: https://github.com/cucumber/compatibility-kit/compare/v7.0.0...v7.1.0
[7.0.0]: https://github.com/cucumber/compatibility-kit/compare/v6.0.0...v7.0.0
[6.0.0]: https://github.com/cucumber/compatibility-kit/compare/v5.0.1...v6.0.0
[5.0.1]: https://github.com/cucumber/compatibility-kit/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/cucumber/compatibility-kit/compare/v4.0.1...v5.0.0
[4.0.1]: https://github.com/cucumber/compatibility-kit/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/cucumber/compatibility-kit/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/cucumber/compatibility-kit/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/cucumber/compatibility-kit/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/cucumber/common/releases/tag/v1.0.0...v0.0.1
