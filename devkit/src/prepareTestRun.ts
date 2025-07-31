import { makeTestPlan, SupportCodeLibrary } from '@cucumber/core'
import { Envelope, IdGenerator } from '@cucumber/messages'

import { TestRunImpl } from './TestRunImpl'
import {
  PickledDocument,
  TestRun,
} from './types'
import {Clock} from "./Clock";
import {Stopwatch} from "./Stopwatch";

export function prepareTestRun(
  newId: IdGenerator.NewId,
  clock: Clock,
  stopwatch: Stopwatch,
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
    onMessage,
    allowedRetries,
    testRunStartedId,
    plans
  )
}
