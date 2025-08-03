import { NewHook, NewParameterType } from '@cucumber/core'
import { SourceReference } from '@cucumber/messages'
import StackUtils from 'stack-utils'

import { state } from './state'
import { World } from './World'

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
  options: Omit<NewHook, 'fn' | 'sourceReference'>,
  fn: HookFunction
): void {
  state.coreBuilder.beforeHook({
    ...options,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function After(
  options: Omit<NewHook, 'fn' | 'sourceReference'>,
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
