import { Envelope } from '@cucumber/messages'
import { Clock } from './Clock'
import { ExecutionContext } from './ExecutionContext'

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
