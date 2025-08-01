import {MessageToNdjsonStream} from '@cucumber/message-streams'
import {Envelope, IdGenerator} from '@cucumber/messages'

import {Clock} from './Clock'
import {Stopwatch} from './Stopwatch'
import {loadSources} from './loadSources'
import {loadSupport} from './loadSupport'
import {meta} from './meta'
import {makeTestPlan} from "@cucumber/core";
import {Runner} from "./Runner";

export async function run(
  paths: ReadonlyArray<string>,
  allowedRetries: number
) {
  const newId = IdGenerator.incrementing()
  const clock = new Clock()
  const stopwatch = new Stopwatch()

  const messagesWriter = new MessageToNdjsonStream()
  const onMessage = (envelope: Envelope) => messagesWriter.write(envelope)
  messagesWriter.pipe(process.stdout)

  onMessage({ meta })
  const pickledDocuments = await loadSources(newId, paths, onMessage)
  const supportCodeLibrary = await loadSupport(newId, paths, onMessage)

  const testRunStartedId = newId()
  const plans = pickledDocuments.map(({ gherkinDocument, pickles }) =>
      makeTestPlan(
          {
              testRunStartedId,
              gherkinDocument,
              pickles,
              supportCodeLibrary,
          },
          {
              newId,
          }
      ))

  await new Runner(
      newId,
      clock,
      stopwatch,
      onMessage,
      allowedRetries,
      testRunStartedId,
      plans
  ).run()
}
