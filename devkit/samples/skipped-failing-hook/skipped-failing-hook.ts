import { After, Given } from '@cucumber/fake-cucumber'

Given('a step that skips', function () {
  return 'skipped'
})

After({}, function () {
  throw new Error('whoops')
})
