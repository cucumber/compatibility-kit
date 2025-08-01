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
  ci: detectCiEnvironment(process.env),
}
