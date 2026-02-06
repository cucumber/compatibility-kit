Feature: Hooks and skipped

  Before and After hooks behave a little differently when it comes to skipping.

  Scenario: Skip from a step

  Skipping from a step causes all subsequent steps to be skipped, but any After hooks
  will still be run normally.

    Given a step that skips

  @skip-before
  Scenario: Skip from a Before hook

  Skipping from a Before hook will cause all subsequent Before hooks and steps to be skipped,
  but any After hooks will still be run normally.

    Given a normal step

  @skip-after
  Scenario: Skip from an After hook

  Skipping from a After hook will only mark that hook as skipped. Any subsequent After hooks
  will still be run normally.

    Given a normal step

  @fail-after
  Scenario: Failure in an After hook

  Failure in an After hook following a skipped step will cause that test case to be considered failed
  overall.

    Given a step that skips
