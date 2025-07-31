import { MessageToNdjsonStream } from '@cucumber/message-streams'
import { Envelope, IdGenerator } from '@cucumber/messages'

import { Clock } from './Clock'
import { Stopwatch } from './Stopwatch'
import { loadSources } from './loadSources'
import { loadSupport } from './loadSupport'
import { meta } from './meta'
import { prepareTestRun } from './prepareTestRun'

export async function run({
  paths,
  requirePaths,
  allowedRetries,
}: {
  paths: ReadonlyArray<string>
  requirePaths: ReadonlyArray<string>
  allowedRetries: number
}) {
  const newId = IdGenerator.incrementing()
  const clock = new Clock()
  const stopwatch = new Stopwatch()

  const messagesWriter = new MessageToNdjsonStream()
  const onMessage = (envelope: Envelope) => messagesWriter.write(envelope)
  messagesWriter.pipe(process.stdout)

  onMessage({ meta })
  const pickledDocuments = await loadSources(newId, paths, onMessage)
  const supportCodeLibrary = await loadSupport(newId, requirePaths, onMessage)

  const testRun = prepareTestRun(
    newId,
    clock,
    stopwatch,
    onMessage,
    allowedRetries,
    pickledDocuments,
    supportCodeLibrary
  )
  await testRun.execute()
}
