import assert from 'assert'
import { Given, When, Then } from '@cucumber/fake-cucumber'

Given('the customer has {int} cents', function (money) {
  this.money = money
  this.chocolates = []
})

When('the customer tries to buy a {int} cent chocolate bar', function (price) {
  if(this.money > price) {
    this.chocolates.push('Mars')
  }
})

Then('the sale should not happen', function () {
  assert(this.chocolates.length).toBe(0)
})

Then('the sale should happen', function () {
  assert(this.chocolates.length).notToBe(0)
})
