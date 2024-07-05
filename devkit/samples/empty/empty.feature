Feature: Empty Scenarios

  Sometimes we want to quickly jot down a new scenario without specifying any actual steps
  for what should be executed.

  In this instance we want to stipulate what should / shouldn't run and what the output is

  Rule: A Scenario that has a Background
    Background:
      Given I am going to do something

    Scenario: Blank Scenario

  Rule: A Scenario that does not have a Background
    Scenario: Blank Scenario 2
