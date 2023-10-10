Feature: Skipping scenarios

  Hooks and step definitions are able to signal at runtime that the scenario should
  be skipped by raising a particular kind of exception status (For example PENDING or SKIPPED).

  This can be useful in certain situations e.g. the current environment doesn't have
  the right conditions for running a particular scenario.

  @skip
  Scenario: Skipping from a Before hook
    Given a step that we expect to be skipped

  Scenario: Skipping from a step doesn't affect the previous steps
    Given an implemented step
    When a step that skips

  Scenario: Skipping from a step causes the rest of the scenario to be skipped
    Given a step that skips
    When a step that we expect to be skipped
