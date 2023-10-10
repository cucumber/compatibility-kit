# frozen_string_literal: true

Before do
  # no-op
end

Before(name: 'A named hook') do
  # no-op
end

When('a step passes') do
  # no-op
end

When('a step throws an exception') do
  raise StandardError, 'Exception in step'
end

After do
  raise StandardError, 'Exception in hook'
end

After('@some-tag or @some-other-tag') do
  raise StandardError, 'Exception in conditional hook'
end

After('@with-attachment') do
  attach(File.open("#{__dir__}/cucumber.svg"), 'image/svg+xml')
end
