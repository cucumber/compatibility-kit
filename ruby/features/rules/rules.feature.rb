# frozen_string_literal: true

Given('the customer has {int} cents') do |money|
  @money = money
  @chocolates = []
end

When('the customer tries to buy a {int} cent chocolate bar') do |price|
  @chocolates << 'Mars' if @money > price
end

Then('the sale should not happen') do
  expect(@chocolates).to be_empty
end

Then('the sale should happen') do
  expect(@chocolates).not_to be_empty
end
