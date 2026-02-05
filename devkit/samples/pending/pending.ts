import { Given, PendingException } from '@cucumber/fake-cucumber'

Given('an implemented non-pending step', function () {
  // no-op
})

Given('an implemented step that is skipped', function () {
  // no-op
})

Given('an unimplemented pending step', function () {
  return 'pending'
})

Given('a pending step with a message', function () {
  throw new PendingException('still working on this')
})
