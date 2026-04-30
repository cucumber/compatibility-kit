import path from 'node:path'

import { buildSupportCode } from '@cucumber/core'
import type { Envelope, IdGenerator } from '@cucumber/messages'
import { globby } from 'globby'

import { state } from './state.js'

export async function loadSupport(
  newId: IdGenerator.NewId,
  sourcePaths: ReadonlyArray<string>,
  onMessage: (envelope: Envelope) => void
) {
  state.coreBuilder = buildSupportCode({ newId })
  for (const supportPath of await findSupportPaths(sourcePaths)) {
    await import(supportPath)
  }
  const supportCodeLibrary = state.coreBuilder.build()
  for (const envelope of supportCodeLibrary.toEnvelopes()) {
    onMessage(envelope)
  }
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
    for (const file of found) {
      supportPaths.add(file)
    }
  }
  return Array.from(supportPaths).sort()
}
