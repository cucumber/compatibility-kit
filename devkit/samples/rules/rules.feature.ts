import assert from 'assert'
import { Given, When, Then } from '@cucumber/fake-cucumber'

Given('the customer has {int} cents', function (money) {
  this.money = money
})

Given('there are chocolate bars in stock', function () {
  this.stock = ['Mars']
})

Given('there are no chocolate bars in stock', function () {
  this.stock = []
})

When('the customer tries to buy a {int} cent chocolate bar', function (price) {
  if(this.money > price) {
    this.chocolate = this.stock.pop
  }
})

Then('the sale should not happen', function () {
  assert(this.chocolate).toBe(null)
})

Then('the sale should happen', function () {
  assert(this.chocolate).notToBe(null)
})
