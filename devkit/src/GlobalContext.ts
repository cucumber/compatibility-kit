import { Envelope } from '@cucumber/messages'

import { Clock } from './Clock.js'
import { ExecutionContext } from './ExecutionContext.js'

export class GlobalContext extends ExecutionContext {
  constructor(
    clock: Clock,
    onMessage: (envelope: Envelope) => void,
    private readonly testRunHookStartedId: string
  ) {
    super(clock, onMessage)
  }

  makeAttachmentRelations() {
    return {
      testRunHookStartedId: this.testRunHookStartedId,
    }
  }
}
