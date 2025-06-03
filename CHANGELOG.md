# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [18.0.3] - 2025-06-03

## [18.0.2] - 2025-02-25
### Fixed
- [Devkit] Do not allow git to change line endings in SVG images ([#125](https://github.com/cucumber/compatibility-kit/pull/125))

## [18.0.1] - 2025-02-24
### Fixed
- [Devkit] Fix hooks-attachment sample ([#122](https://github.com/cucumber/compatibility-kit/pull/122))

## [18.0.0] - 2025-02-24
### Changed
- [Devkit] Slice hook and attachment samples more thinly ([#122](https://github.com/cucumber/compatibility-kit/pull/122))

## [17.0.1] - 2025-01-29
### Fixed
- [Ruby] Fixed an issue where the CCK didn't release

## [17.0.0] - 2024-11-12
### Added
- Add `TestRunStarted.id`, `TestCase.testRunStartedId` and `TestRunFinished.testRunStartedId` to reference messages
- Add `Hook.type` to reference messages

## [16.3.0] - 2024-09-23
### Added
- Add example for empty scenario ([#103](https://github.com/cucumber/compatibility-kit/pull/103))

### Removed
- [Ruby] The reference to the messages gem is no longer required

## [16.2.0] - 2024-08-15
### Changed
- [Ruby] Permit messages up to v28 ([#107](https://github.com/cucumber/compatibility-kit/pull/107))

## [16.1.0] - 2024-08-02
### Added
- Add `text/uri-list` attachment samples ([#106](https://github.com/cucumber/compatibility-kit/pull/106))

## [16.0.0] - 2024-07-09
### Changed
- Removed the blank before hook in the `attachments.feature` example ([#102](https://github.com/cucumber/compatibility-kit/pull/102))
- [Ruby] Minimum ruby version is now bumped from 2.6 to 3.0 ([#105](https://github.com/cucumber/compatibility-kit/pull/105))
- [Ruby] **Breaking Change** - Removed the "shim" file that redirected to the gem helpers ([#105](https://github.com/cucumber/compatibility-kit/pull/105))

### Fixed
- Fixed a sample reporting incorrect step type ([#104](https://github.com/cucumber/compatibility-kit/pull/104))

## [15.2.0] - 2024-07-03
### Changed
- Permit messages in v25 ([#100](https://github.com/cucumber/compatibility-kit/pull/100))

## [15.1.0] - 2024-06-22
### Added
- Add example with parameterized Scenario Outline ([#98](https://github.com/cucumber/compatibility-kit/pull/98))

### Fixed
- [Ruby] Fixed a duplicate conflicting method that caused the CCK not to load feature paths ([#95](https://github.com/cucumber/compatibility-kit/pull/95))

## [15.0.0] - 2024-01-08
### Changed
- [Ruby] Remove all step definition and support code from the package ([#94](https://github.com/cucumber/compatibility-kit/pull/94))
- [Ruby] Minimum ruby version is now bumped from 2.5 to 2.6 ([#94](https://github.com/cucumber/compatibility-kit/pull/94))

## [14.1.0] - 2023-11-10
### Added
- Add `message` on pending step result ([#91](https://github.com/cucumber/compatibility-kit/pull/91))

### Fixed
- [Ruby] Fixed an incorrectly written step for a `rules` scenario ([#87](https://github.com/cucumber/compatibility-kit/pull/87))

## [14.0.0] - 2023-11-01
### Changed
- [Ruby] Optimised the `MessageComparator` class and the feature detection methods ([#84](https://github.com/cucumber/compatibility-kit/pull/84))
- Completely re-wrote the `hooks` and `rules` scenarios to more closely mimic what they should be testing ([#78](https://github.com/cucumber/compatibility-kit/pull/78) [#76](https://github.com/cucumber/compatibility-kit/pull/76))

### Fixed
- Reconciled the `attachment`, `cdata`, `parameter-types` and `pending` scenarios
([#69](https://github.com/cucumber/compatibility-kit/pull/69) [#68](https://github.com/cucumber/compatibility-kit/pull/68) [#74](https://github.com/cucumber/compatibility-kit/pull/74) [#77](https://github.com/cucumber/compatibility-kit/pull/77))

## [13.0.2] - 2023-10-24
### Changed
- [Ruby] Fixed all autofix cops ([#71](https://github.com/cucumber/compatibility-kit/pull/71))

### Fixed
- Reconciled the `data-tables`, `examples-tables`, `minimal` and `retry` scenarios
([#70](https://github.com/cucumber/compatibility-kit/pull/70) [#72](https://github.com/cucumber/compatibility-kit/pull/72) [#73](https://github.com/cucumber/compatibility-kit/pull/73) [#79](https://github.com/cucumber/compatibility-kit/pull/79))

## [13.0.1] - 2023-10-11
### Changed
- [Ruby] Improved a bunch of the manual fix cops ([#58](https://github.com/cucumber/compatibility-kit/pull/58))

### Fixed
- [Ruby] Fix the message comparison to ignore `Ci` nested properties and all `Git` properties ([#66](https://github.com/cucumber/compatibility-kit/pull/66))
- Reconciled the `unknown-parameter-type`, `undefined`, `stack-traces` and `skipped` scenarios
([#61](https://github.com/cucumber/compatibility-kit/pull/61) [#62](https://github.com/cucumber/compatibility-kit/pull/62) [#64](https://github.com/cucumber/compatibility-kit/pull/64) [#65](https://github.com/cucumber/compatibility-kit/pull/65))

### Removed
- [Ruby] A bunch of debugging methods are no longer needed ([#59](https://github.com/cucumber/compatibility-kit/pull/59))
- [Ruby] A bunch of legacy code relating to cucumber 4 and lower ([#63](https://github.com/cucumber/compatibility-kit/pull/63))

## [13.0.0] - 2023-10-09
### Added
- [Ruby] Initial rubocop gems and basic compliance added (More work to come) ([#49](https://github.com/cucumber/compatibility-kit/pull/49))

### Changed
- [Ruby] Minimum ruby version is now bumped from 2.3 to 2.5 ([#47](https://github.com/cucumber/compatibility-kit/pull/47))
- [Ruby] Refactored `KeysChecker#compare` to be a lot less complex and slightly more performant ([#51](https://github.com/cucumber/compatibility-kit/pull/51))

### Fixed
- [Ruby] The `meta` key was being erroneously checked when running CCK tests ([#43](https://github.com/cucumber/compatibility-kit/pull/43))
- [Ruby] All messages were being analysed as `attachment` when running CCK tests ([#45](https://github.com/cucumber/compatibility-kit/pull/45))
- [Ruby] Added in missing step definition for `Attaching a document with a filename` ([#48](https://github.com/cucumber/compatibility-kit/pull/48))
- Fixed attach a JPEG scenario to attach a JPEG (Instead of a PNG) ([#52](https://github.com/cucumber/compatibility-kit/pull/52))
- Fixed attach and rename a PDF scenario to rename the PDF (It didn't rename it) ([#52](https://github.com/cucumber/compatibility-kit/pull/52))

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

[Unreleased]: https://github.com/cucumber/compatibility-kit/compare/v18.0.3...HEAD
[18.0.3]: https://github.com/cucumber/compatibility-kit/compare/v18.0.2...v18.0.3
[18.0.2]: https://github.com/cucumber/compatibility-kit/compare/v18.0.1...v18.0.2
[18.0.1]: https://github.com/cucumber/compatibility-kit/compare/v18.0.0...v18.0.1
[18.0.0]: https://github.com/cucumber/compatibility-kit/compare/v17.0.1...v18.0.0
[17.0.1]: https://github.com/cucumber/compatibility-kit/compare/v17.0.0...v17.0.1
[17.0.0]: https://github.com/cucumber/compatibility-kit/compare/v16.3.0...v17.0.0
[16.3.0]: https://github.com/cucumber/compatibility-kit/compare/v16.2.0...v16.3.0
[16.2.0]: https://github.com/cucumber/compatibility-kit/compare/v16.1.0...v16.2.0
[16.1.0]: https://github.com/cucumber/compatibility-kit/compare/v16.0.0...v16.1.0
[16.0.0]: https://github.com/cucumber/compatibility-kit/compare/v15.2.0...v16.0.0
[15.2.0]: https://github.com/cucumber/compatibility-kit/compare/v15.1.0...v15.2.0
[15.1.0]: https://github.com/cucumber/compatibility-kit/compare/v15.0.0...v15.1.0
[15.0.0]: https://github.com/cucumber/compatibility-kit/compare/v14.1.0...v15.0.0
[14.1.0]: https://github.com/cucumber/compatibility-kit/compare/v14.0.0...v14.1.0
[14.0.0]: https://github.com/cucumber/compatibility-kit/compare/v13.0.2...v14.0.0
[13.0.2]: https://github.com/cucumber/compatibility-kit/compare/v13.0.1...v13.0.2
[13.0.1]: https://github.com/cucumber/compatibility-kit/compare/v13.0.0...v13.0.1
[13.0.0]: https://github.com/cucumber/compatibility-kit/compare/v12.0.0...v13.0.0
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
