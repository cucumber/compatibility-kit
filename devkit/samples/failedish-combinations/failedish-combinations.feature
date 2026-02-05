Feature: Failed-ish combinations
  Sometimes the first failed-ish step's status is not the only one.

  Scenario: Pending + Undefined
    Given a pending step
    And an undefined step
    And a step

  Scenario: Pending + Ambiguous
    Given a pending step
    And an ambiguous step
    And a step

  Scenario: Undefined + Undefined
    Given an undefined step
    And another undefined step
    And a step

  Scenario: Ambiguous + Ambiguous
    Given an ambiguous step
    And an ambiguous step
    And a step


