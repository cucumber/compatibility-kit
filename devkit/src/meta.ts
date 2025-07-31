import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import detectCiEnvironment from '@cucumber/ci-environment'
import { Meta, version as protocolVersion } from '@cucumber/messages'

const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), {
    encoding: 'utf-8',
  })
) as {
  version: string
}

export const meta: Meta = {
  protocolVersion,
  implementation: {
    name: 'fake-cucumber',
    version,
  },
  cpu: {
    name: os.arch(),
  },
  os: {
    name: os.platform(),
    version: os.release(),
  },
  runtime: {
    name: 'Node.js',
    version: process.versions.node,
  },
  ci: detectCiEnvironment(process.env),
}
