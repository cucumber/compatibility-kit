import fs from 'node:fs'
import path from 'node:path'

import { buildSupportCode } from '@cucumber/core'
import { Envelope, IdGenerator } from '@cucumber/messages'
import { glob } from 'glob'

import { state } from './state'

export async function loadSupport(
  newId: IdGenerator.NewId,
  sourcePaths: ReadonlyArray<string>,
  onMessage: (envelope: Envelope) => void
) {
  state.coreBuilder = buildSupportCode({ newId })
  const supportCodePaths = await findSupportCodePaths(sourcePaths)
  let tsNodeRegistered = false
  for (const supportCodePath of supportCodePaths) {
    if (supportCodePath.endsWith('.ts') && !tsNodeRegistered) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const tsnode = require('ts-node')
      tsnode.register({
        transpileOnly: true,
      })
      tsNodeRegistered = true
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(supportCodePath)
  }
  const supportCodeLibrary = state.coreBuilder.build()
  supportCodeLibrary.toEnvelopes().forEach((envelope) => onMessage(envelope))
  return supportCodeLibrary
}

async function findSupportCodePaths(
  sourcePaths: ReadonlyArray<string>
): Promise<ReadonlyArray<string>> {
  const files = new Set<string>()
  for (const sourcePath of sourcePaths) {
    const stats = fs.lstatSync(sourcePath)
    if (stats.isDirectory()) {
      const codePaths = await globCode(sourcePath)
      for (const codePath of codePaths) {
        files.add(path.resolve(codePath))
      }
    } else if (stats.isFile()) {
      const ext = path.extname(sourcePath)
      if (['.js', '.ts'].includes(ext)) {
        files.add(path.resolve(sourcePath))
      } else {
        const dir = path.dirname(sourcePath)
        const codePaths = await globCode(dir)
        for (const codePath of codePaths) {
          files.add(path.resolve(codePath))
        }
      }
    } else {
      throw new Error(
        `Can't load ${sourcePath} - it is not a regular file or directory`
      )
    }
  }
  return Array.from(files).sort()
}

function globCode(dir: string) {
  return glob(`${dir}/**/*.{js,ts}`, { posix: true, dotRelative: true })
}
