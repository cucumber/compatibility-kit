# frozen_string_literal: true

Before('@skip') do
  'skipped'
end

Given('a step that does not skip') do
  # no-op
end

Given('a step that is skipped') do
  # no-op
end

Given('I skip a step') do
  'skipped'
end
