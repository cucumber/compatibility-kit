import path from 'node:path'

import { buildSupportCode } from '@cucumber/core'
import { Envelope, IdGenerator } from '@cucumber/messages'
import globby from 'globby'

import { state } from './state'

export async function loadSupport(
  newId: IdGenerator.NewId,
  sourcePaths: ReadonlyArray<string>,
  onMessage: (envelope: Envelope) => void
) {
  state.coreBuilder = buildSupportCode({ newId })
  for (const supportPath of await findSupportPaths(sourcePaths)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(supportPath)
  }
  const supportCodeLibrary = state.coreBuilder.build()
  supportCodeLibrary.toEnvelopes().forEach((envelope) => onMessage(envelope))
  return supportCodeLibrary
}

async function findSupportPaths(
  sourcePaths: ReadonlyArray<string>
): Promise<ReadonlyArray<string>> {
  const supportPaths = new Set<string>()
  for (const sourcePath of sourcePaths) {
    const directory = path.dirname(sourcePath)
    const found = await globby([`${directory}/**/*.{js,ts}`], {
      absolute: true,
    })
    found.forEach((file) => supportPaths.add(file))
  }
  return Array.from(supportPaths).sort()
}
