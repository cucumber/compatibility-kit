import {
  NewParameterType,
  NewTestCaseHook,
  NewTestRunHook,
} from '@cucumber/core'
import { SourceReference } from '@cucumber/messages'
import StackUtils from 'stack-utils'

import { state } from './state.js'
import { World } from './World.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HookFunction = (this: World) => any | Promise<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StepFunction = (this: World, ...args: any[]) => any | Promise<any>

export { DataTable } from '@cucumber/core'

export function ParameterType(
  options: Omit<NewParameterType, 'sourceReference'>
) {
  state.coreBuilder.parameterType({
    ...options,
    sourceReference: makeSourceReference(),
  })
}

export function Before(
  options: Omit<NewTestCaseHook, 'fn' | 'sourceReference'>,
  fn: HookFunction
): void {
  state.coreBuilder.beforeHook({
    ...options,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function After(
  options: Omit<NewTestCaseHook, 'fn' | 'sourceReference'>,
  fn: HookFunction
): void {
  state.coreBuilder.afterHook({
    ...options,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function Given(pattern: string | RegExp, fn: StepFunction) {
  state.coreBuilder.step({
    pattern,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function When(pattern: string | RegExp, fn: StepFunction) {
  state.coreBuilder.step({
    pattern,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function Then(pattern: string | RegExp, fn: StepFunction) {
  state.coreBuilder.step({
    pattern,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function BeforeAll(
  options: Omit<NewTestRunHook, 'fn' | 'sourceReference'>,
  fn: HookFunction
): void {
  state.coreBuilder.beforeAllHook({
    ...options,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function AfterAll(
  options: Omit<NewTestRunHook, 'fn' | 'sourceReference'>,
  fn: HookFunction
): void {
  state.coreBuilder.afterAllHook({
    ...options,
    fn,
    sourceReference: makeSourceReference(),
  })
}

function makeSourceReference(): SourceReference {
  const error = new Error()
  if (!error.stack) {
    return {}
  }
  const stackUtils = new StackUtils({
    cwd: process.cwd(),
    internals: StackUtils.nodeInternals(),
  })
  const trace = stackUtils.clean(error.stack)
  const parsed = stackUtils.parseLine(trace.split('\n')[2])
  if (!parsed) {
    return {}
  }
  const { file: uri, line = 1 } = parsed
  return {
    uri,
    location: {
      line,
    },
  }
}
