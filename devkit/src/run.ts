import { MessageToNdjsonStream } from '@cucumber/message-streams'
import { Envelope, IdGenerator } from '@cucumber/messages'

import { DateClock } from './DateClock'
import { formatFullStackTrace } from './formatFullStackTrace'
import { IncrementalClock } from './IncrementalClock'
import { IncrementalStopwatch } from './IncrementalStopwatch'
import { loadSources } from './loadSources'
import { loadSupport } from './loadSupport'
import { meta } from './meta'
import { PerfHooksStopwatch } from './PerfHooksStopwatch'
import { prepareTestRun } from './prepareTestRun'
import { FormatStackTrace } from './types'

export async function run({
  paths,
  requirePaths,
  allowedRetries,
  predictableIds,
}: {
  paths: ReadonlyArray<string>
  requirePaths: ReadonlyArray<string>
  allowedRetries: number
  predictableIds: boolean
}) {
  const newId = predictableIds ? IdGenerator.incrementing() : IdGenerator.uuid()
  const clock = predictableIds ? new IncrementalClock() : new DateClock()
  const stopwatch = predictableIds
    ? new IncrementalStopwatch()
    : new PerfHooksStopwatch()
  const formatStackTrace: FormatStackTrace = predictableIds
    ? (_error, sourceFrame) => sourceFrame
    : formatFullStackTrace

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
    formatStackTrace,
    onMessage,
    allowedRetries,
    pickledDocuments,
    supportCodeLibrary
  )
  await testRun.execute()
}
