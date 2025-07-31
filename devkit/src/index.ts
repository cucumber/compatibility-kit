import { NewParameterType, SupportCodeFunction } from '@cucumber/core'

import { state } from './state'
import {SourceReference} from "@cucumber/messages";
import StackUtils from "stack-utils";

interface HookOptions {
  name?: string
  tagExpression?: string
}

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
  arg1: string | HookOptions | SupportCodeFunction,
  arg2: SupportCodeFunction
): void {
  let options: HookOptions = {}
  if (typeof arg1 === 'string') {
    options.tagExpression = arg1
  } else if (typeof arg1 === 'object') {
    options = arg1
  }
  const fn = arg2 ?? (arg1 as SupportCodeFunction)
  state.coreBuilder.beforeHook({
    name: options.name,
    tags: options.tagExpression,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function After(
  arg1: string | HookOptions | SupportCodeFunction,
  arg2: SupportCodeFunction
): void {
  let options: HookOptions = {}
  if (typeof arg1 === 'string') {
    options.tagExpression = arg1
  } else if (typeof arg1 === 'object') {
    options = arg1
  }
  const fn = arg2 ?? (arg1 as SupportCodeFunction)
  state.coreBuilder.afterHook({
    name: options.name,
    tags: options.tagExpression,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function Given(pattern: string | RegExp, fn: SupportCodeFunction) {
  state.coreBuilder.step({
    pattern,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function When(pattern: string | RegExp, fn: SupportCodeFunction) {
  state.coreBuilder.step({
    pattern,
    fn,
    sourceReference: makeSourceReference(),
  })
}

export function Then(pattern: string | RegExp, fn: SupportCodeFunction) {
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
  const parsed = stackUtils.parseLine(trace.split('\n')[2]);
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
