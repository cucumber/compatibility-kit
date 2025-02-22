import { When, Before, After } from '@cucumber/fake-cucumber'

Before('@passing-hook', async function () {

})

Before('@fail-before', function () {
  throw new Error('Exception in conditional hook')
})

When('a step passes', function () {
  // no-op
})

After('@@fail-after', function () {
  throw new Error('Exception in conditional hook')
})

After('@passing-hook', async function () {

})
