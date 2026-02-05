import { Given, PendingException } from '@cucumber/fake-cucumber'

Given('an unimplemented pending step', function () {
  throw new PendingException('TODO')
})
