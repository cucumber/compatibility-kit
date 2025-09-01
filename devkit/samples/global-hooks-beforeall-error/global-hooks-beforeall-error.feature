Feature: Global hooks
  Errors in BeforeAll hooks cause the whole test run to fail, and no other hooks or test cases are executed.

  Scenario: A passing scenario
    When a step passes
