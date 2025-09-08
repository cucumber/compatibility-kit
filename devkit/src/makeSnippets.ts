import { SupportCodeLibrary } from '@cucumber/core'
import {
  PickleStep,
  PickleStepArgument,
  PickleStepType,
  Snippet,
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
  const stepArgument = makeStepArgument(pickleStep.argument)
  return supportCodeLibrary
    .getExpressionGenerator()
    .generateExpressions(pickleStep.text)
    .map((expression) => {
      const allArguments = expression.parameterInfos.map((pi) => {
        let result = pi.name + (pi.count === 1 ? '' : pi.count.toString())
        if (pi.type) {
          const sanitisedType = PRIMITIVE_TYPES.includes(pi.type)
            ? pi.type.toLowerCase()
            : pi.type
          result += `: ${sanitisedType}`
        }
        return result
      })
      if (stepArgument) {
        allArguments.push(stepArgument)
      }
      const code = `${method}(${JSON.stringify(expression.source)}, (${allArguments.join(', ')}) => {
  return "pending"
})`
      return {
        language: 'typescript',
        code,
      }
    })
}

function makeStepArgument(pickleStepArgument: PickleStepArgument | undefined) {
  if (pickleStepArgument?.dataTable) {
    return 'dataTable: DataTable'
  } else if (pickleStepArgument?.docString) {
    return 'docString: string'
  }
  return ''
}
