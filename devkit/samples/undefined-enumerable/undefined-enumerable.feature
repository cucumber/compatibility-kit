Feature: Undefined steps

  At runtime, Cucumber may encounter many steps in a scenario that it cannot match to a step definition.

  In these cases, the scenario is not able to run and so the step status will be UNDEFINED, with
  subsequent steps being SKIPPED and the overall result will be FAILURE.

  Scenario: An undefined step causes a failure
    Given a step that is yet to be defined

  Scenario: Steps before undefined steps are executed
    Given an implemented step
    And an implemented step
    And a step that is yet to be defined
    And another step that is also yet to be defined
    And a third step that is yet to be defined

  Scenario: Steps after undefined steps are skipped
    Given a step that is yet to be defined
    And a step that will be skipped
    And a step that will be skipped

  Scenario: Multiple missing snippets reflect parameter types
    Given a list of 8 things
    And a list of 3.14 things
    And a list of "many" things

  Scenario: Multiple undefined steps also cause a failure
    Given a step that is yet to be defined
    And another step that is also yet to be defined
