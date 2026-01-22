import { parseArgs } from 'node:util'

import { MessageToNdjsonStream } from '@cucumber/message-streams'
import { Envelope, IdGenerator } from '@cucumber/messages'

import { Clock } from './Clock.js'
import { loadSources } from './loadSources.js'
import { loadSupport } from './loadSupport.js'
import { meta } from './meta.js'
import { Runner } from './Runner.js'
import { Stopwatch } from './Stopwatch.js'

async function main() {
  const { positionals: paths, values } = parseArgs({
    options: {
      error: {
        type: 'boolean',
      },
      order: {
        type: 'string',
      },
      retry: {
        type: 'string',
      },
    },
    allowPositionals: true,
    strict: false,
  })
  const allowedRetries = Number(values['retry'] ?? 0)
  const contriveError = !!values['error']
  const order =
    typeof values['order'] === 'string' ? values['order'] : 'defined'

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
    {
      allowedRetries,
      contriveError,
      order,
    },
    pickledDocuments,
    supportCodeLibrary
  ).run()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
