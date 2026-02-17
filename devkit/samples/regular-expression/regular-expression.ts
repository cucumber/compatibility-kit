import { Given } from '@cucumber/fake-cucumber'

Given(/^a (.*?)(?: and a (.*?))?(?: and a (.*?))?$/, 
    function (vegetable1: string, vegetable2: string, vegetable3: string) {
  // no-op
})
