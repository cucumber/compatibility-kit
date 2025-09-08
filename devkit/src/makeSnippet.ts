import {
  PickleStep,
  PickleStepArgument,
  PickleStepType,
  Snippet,
} from '@cucumber/messages'

const FUNCTION_BY_STEP_TYPE: Record<PickleStepType, string> = {
  [PickleStepType.CONTEXT]: 'Given',
  [PickleStepType.ACTION]: 'When',
  [PickleStepType.OUTCOME]: 'Then',
  [PickleStepType.UNKNOWN]: 'Given',
}

export function makeSnippet(pickleStep: PickleStep): Snippet {
  const method =
    FUNCTION_BY_STEP_TYPE[pickleStep.type ?? PickleStepType.UNKNOWN]
  const expression = JSON.stringify(pickleStep.text)
  const arg = makeArgument(pickleStep.argument)
  const code = `${method}(${expression}, (${arg}) => {
  return "pending"
})`
  return {
    language: 'typescript',
    code,
  }
}

function makeArgument(pickleStepArgument: PickleStepArgument | undefined) {
  if (pickleStepArgument?.dataTable) {
    return 'dataTable: DataTable'
  } else if (pickleStepArgument?.docString) {
    return 'docString: string'
  }
  return ''
}
