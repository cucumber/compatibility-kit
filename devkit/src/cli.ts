import { parseArgs } from 'node:util'

import { makeTestPlan } from '@cucumber/core'
import { MessageToNdjsonStream } from '@cucumber/message-streams'
import { Envelope, IdGenerator } from '@cucumber/messages'

import { Clock } from './Clock'
import { loadSources } from './loadSources'
import { loadSupport } from './loadSupport'
import { meta } from './meta'
import { Runner } from './Runner'
import { Stopwatch } from './Stopwatch'

async function main() {
  const { positionals: paths, values } = parseArgs({
    options: {
      retry: {
        type: 'string',
      },
    },
    allowPositionals: true,
    strict: false,
  })
  const allowedRetries = Number(values['retry'] ?? 0)

  const newId = IdGenerator.incrementing()
  const clock = new Clock()
  const stopwatch = new Stopwatch()

  const messagesWriter = new MessageToNdjsonStream()
  const onMessage = (envelope: Envelope) => messagesWriter.write(envelope)
  messagesWriter.pipe(process.stdout)

  onMessage({ meta })
  const pickledDocuments = await loadSources(newId, paths, onMessage)
  const supportCodeLibrary = await loadSupport(newId, paths, onMessage)

  await new Runner(
    newId,
    clock,
    stopwatch,
    onMessage,
    allowedRetries,
    pickledDocuments,
    supportCodeLibrary
  ).run()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
