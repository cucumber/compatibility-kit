Feature: Hooks
  Hooks are special steps that run before or after each scenario's steps.

  They can also conditionally target specific scenarios, using tag expressions

  Scenario: No tags and a passed step
    When a step passes

  Scenario: No tags and a failed step
    When a step fails

  Scenario: No tags and a undefined step
    When a step does not exist

  @some-tag
  Scenario: With a tag and a passed step
    When a step passes

  @with-attachment
  Scenario: With an tag, an attachment in the hook and a passed step
    When a step passes
