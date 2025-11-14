import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    // ensure we get the correct platform-dependent exports where needed
    conditions: ['node'],
  },
})
