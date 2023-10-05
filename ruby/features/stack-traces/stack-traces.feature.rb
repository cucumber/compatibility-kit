# frozen_string_literal: true

When('a step throws an exception') do
  raise StandardError, 'An exception is raised here'
end
