import { makeTestPlan, SupportCodeLibrary } from '@cucumber/core'
import { Envelope, IdGenerator } from '@cucumber/messages'

import { TestRunImpl } from './TestRunImpl'
import {
  Clock,
  FormatStackTrace,
  PickledDocument,
  Stopwatch,
  TestRun,
} from './types'

export function prepareTestRun(
  newId: IdGenerator.NewId,
  clock: Clock,
  stopwatch: Stopwatch,
  formatStackTrace: FormatStackTrace,
  onMessage: (envelope: Envelope) => void,
  allowedRetries: number,
  pickledDocuments: ReadonlyArray<PickledDocument>,
  supportCodeLibrary: SupportCodeLibrary
): TestRun {
  const testRunStartedId = newId()
  const plans = pickledDocuments.map(({ gherkinDocument, pickles }) => {
    return makeTestPlan(
      {
        testRunStartedId,
        gherkinDocument,
        pickles,
        supportCodeLibrary,
      },
      {
        newId,
      }
    )
  })
  return new TestRunImpl(
    newId,
    clock,
    stopwatch,
    formatStackTrace,
    onMessage,
    allowedRetries,
    testRunStartedId,
    plans
  )
}
