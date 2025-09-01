Feature: Global hooks
  Errors in BeforeAll hooks cause the whole test run to fail, and no subsequent BeforeAll hooks, test cases or AfterAll hooks are executed.

  Scenario: A passing scenario
    When a step passes
