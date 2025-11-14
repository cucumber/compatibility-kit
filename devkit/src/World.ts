import { Envelope } from '@cucumber/messages'

import { Clock } from './Clock.js'
import { ExecutionContext } from './ExecutionContext.js'

export class World extends ExecutionContext {
  public testStepId: string | undefined

  constructor(
    clock: Clock,
    onMessage: (envelope: Envelope) => void,
    private readonly testCaseStartedId: string
  ) {
    super(clock, onMessage)
  }

  makeAttachmentRelations() {
    return {
      testCaseStartedId: this.testCaseStartedId,
      testStepId: this.testStepId,
    }
  }
}
