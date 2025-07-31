import { When, Before, After } from '../../'

Before({tags: '@passing-hook'}, async function () {
  // no-op
})

Before({tags: '@fail-before'}, function () {
  throw new Error('Exception in conditional hook')
})

When('a step passes', function () {
  // no-op
})

After({tags: '@fail-after'}, function () {
  throw new Error('Exception in conditional hook')
})

After({tags: '@passing-hook'}, async function () {
  // no-op
})
