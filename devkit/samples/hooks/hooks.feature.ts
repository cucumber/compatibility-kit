import { When, Before, After } from '../../'

Before(function () {
  // no-op
})

When('a step passes', function () {
  // no-op
})

When('a step fails', function () {
  throw new Error('Exception in step')
})

After(function () {
  // no-op
})
