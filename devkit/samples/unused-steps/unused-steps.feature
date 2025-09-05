Feature: Unused steps
  Depending on the run, some step definitions may not be used. This is valid, and the step definitions are still
  includes in the stream of messages, which allows formatters to report on step usage if desired.

  This feature is expecting 2 step definitions defined
    - Given a step that is used (This will be used in the execution proper and output in messages)
    - Given a step that is not used (This is not used in execution proper, but is still output in messages)

  Scenario: a scenario
    Given a step that is used
