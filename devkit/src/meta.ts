import detectCiEnvironment from '@cucumber/ci-environment'
import { Meta, version as protocolVersion } from '@cucumber/messages'

export const meta: Meta = {
  protocolVersion,
  implementation: {
    name: 'fake-cucumber',
    version: '123.45.6',
  },
  cpu: {
    name: 'arm64',
  },
  os: {
    name: 'darwin',
    version: '24.5.0',
  },
  runtime: {
    name: 'Node.js',
    version: '24.4.1',
  },
  ci: detectCiEnvironment({
    GITHUB_SERVER_URL: 'https://github.com',
    GITHUB_REPOSITORY: 'cucumber-ltd/shouty.rb',
    GITHUB_RUN_ID: '154666429',
    GITHUB_SHA: '99684bcacf01d95875834d87903dcb072306c9ad',
    GITHUB_REF: 'refs/heads/main',
    GITHUB_HEAD_REF: 'main',
  }),
}
