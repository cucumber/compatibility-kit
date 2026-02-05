import { Given, SkippedException } from '@cucumber/fake-cucumber'

Given('I skip a step', function () {
  throw new SkippedException('skipping')
})
