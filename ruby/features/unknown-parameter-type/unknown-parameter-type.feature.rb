# frozen_string_literal: true

Given('{airport} is closed because of a strike') do |_airport|
  raise StandardError, 'Should not be called because airport parameter type has not been defined'
end
