import { Given, SkippedException } from '@cucumber/fake-cucumber'

Given('a step that does not skip', function () {
  // no-op
})

Given('a step that is skipped', function () {
  // no-op
})

Given('I skip a step', function () {
  return 'skipped'
})

Given('a skipped step with a message', function () {
  throw new SkippedException('not running this today')
})
