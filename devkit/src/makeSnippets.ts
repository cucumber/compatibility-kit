import type { SupportCodeLibrary } from '@cucumber/core'
import {
  type PickleStep,
  type PickleStepArgument,
  PickleStepType,
  type Snippet,
} from '@cucumber/messages'

const PRIMITIVE_TYPES = ['Number', 'String']

const METHOD_BY_TYPE: Record<PickleStepType, string> = {
  [PickleStepType.CONTEXT]: 'Given',
  [PickleStepType.ACTION]: 'When',
  [PickleStepType.OUTCOME]: 'Then',
  [PickleStepType.UNKNOWN]: 'Given',
}

export function makeSnippets(
  pickleStep: PickleStep,
  supportCodeLibrary: SupportCodeLibrary
): ReadonlyArray<Snippet> {
  const method = METHOD_BY_TYPE[pickleStep.type ?? PickleStepType.UNKNOWN]
  const stepArguments = makeStepArguments(pickleStep.argument)
  return supportCodeLibrary
    .getExpressionGenerator()
    .generateExpressions(pickleStep.text)
    .map((expression) => {
      const allArguments = expression.parameterInfos.map((pi) => {
        let result = pi.name + (pi.count === 1 ? '' : pi.count.toString())
        if (pi.type) {
          const sanitisedType = PRIMITIVE_TYPES.includes(pi.type) ? pi.type.toLowerCase() : pi.type
          result += `: ${sanitisedType}`
        }
        return result
      })
      allArguments.push(...stepArguments)
      const code = `${method}(${JSON.stringify(expression.source)}, (${allArguments.join(', ')}) => {
  return "pending"
})`
      return {
        language: 'typescript',
        code,
      }
    })
}

function makeStepArguments(pickleStepArgument: PickleStepArgument | undefined) {
  const stepArguments: Array<{ index?: number; code: string }> = []
  if (pickleStepArgument?.dataTable) {
    stepArguments.push({
      index: pickleStepArgument.dataTable.argumentIndex,
      code: 'dataTable: DataTable',
    })
  }
  if (pickleStepArgument?.docString) {
    stepArguments.push({
      index: pickleStepArgument.docString.argumentIndex,
      code: 'docString: string',
    })
  }
  return stepArguments
    .sort((a, b) => (a.index ?? Number.MAX_SAFE_INTEGER) - (b.index ?? Number.MAX_SAFE_INTEGER))
    .map(({ code }) => code)
}
