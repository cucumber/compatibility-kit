import {
  AmbiguousError,
  AssembledTestCase,
  AssembledTestStep,
  DefinedTestRunHook,
  makeTestPlan,
  SupportCodeLibrary,
  UndefinedError,
} from '@cucumber/core'
import {
  Envelope,
  GherkinDocument,
  IdGenerator,
  Pickle,
  SourceReference,
  TestStepResult,
  TestStepResultStatus,
  TimeConversion,
} from '@cucumber/messages'

import { Clock } from './Clock'
import { Stopwatch } from './Stopwatch'
import { World } from './World'

const NON_SUCCESS_STATUSES = new Set<TestStepResultStatus>([
  TestStepResultStatus.PENDING,
  TestStepResultStatus.UNDEFINED,
  TestStepResultStatus.AMBIGUOUS,
  TestStepResultStatus.FAILED,
])

export class Runner {
  private readonly testRunStartedId: string
  private readonly statuses = new Set<TestStepResultStatus>()

  constructor(
    private readonly newId: IdGenerator.NewId,
    private readonly clock: Clock,
    private readonly stopwatch: Stopwatch,
    private readonly onMessage: (envelope: Envelope) => void,
    private readonly allowedRetries: number,
    private readonly pickledDocuments: ReadonlyArray<{
      gherkinDocument: GherkinDocument
      pickles: ReadonlyArray<Pickle>
    }>,
    private readonly supportCodeLibrary: SupportCodeLibrary
  ) {
    this.testRunStartedId = this.newId()
  }

  async run() {
    this.markTestRunStarted()

    for (const hook of this.supportCodeLibrary.getAllBeforeAllHooks()) {
      if (!(await this.executeGlobalHook(hook))) {
        return this.markTestRunFinished()
      }
    }

    const testCases = this.makeTestCases()
    for (const testCase of testCases) {
      await this.executeTestCase(testCase)
    }

    for (const hook of this.supportCodeLibrary
      .getAllAfterAllHooks()
      .toReversed()) {
      if (!(await this.executeGlobalHook(hook))) {
        return this.markTestRunFinished()
      }
    }

    this.markTestRunFinished()
  }

  private markTestRunStarted() {
    this.onMessage({
      testRunStarted: {
        id: this.testRunStartedId,
        timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
          this.clock.now()
        ),
      },
    })
  }

  private markTestRunFinished() {
    this.onMessage({
      testRunFinished: {
        testRunStartedId: this.testRunStartedId,
        timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
          this.clock.now()
        ),
        success: this.statuses.isDisjointFrom(NON_SUCCESS_STATUSES),
      },
    })
  }

  private makeTestCases(): ReadonlyArray<AssembledTestCase> {
    const plans = this.pickledDocuments.map(({ gherkinDocument, pickles }) =>
      makeTestPlan(
        {
          testRunStartedId: this.testRunStartedId,
          gherkinDocument,
          pickles,
          supportCodeLibrary: this.supportCodeLibrary,
        },
        {
          newId: this.newId,
        }
      )
    )

    plans
      .flatMap((plan) => plan.toEnvelopes())
      .forEach((envelope) => this.onMessage(envelope))

    return plans.flatMap((plan) => plan.testCases)
  }

  private async executeGlobalHook(hook: DefinedTestRunHook): Promise<boolean> {
    const testRunHookStartedId = this.newId()
    this.onMessage({
      testRunHookStarted: {
        testRunStartedId: this.testRunStartedId,
        id: testRunHookStartedId,
        hookId: hook.id,
        timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
          this.clock.now()
        ),
      },
    })

    let mostOfResult: Omit<TestStepResult, 'duration'> = {
      status: TestStepResultStatus.PASSED,
    }
    const startTime = this.stopwatch.now()
    try {
      const { fn } = hook
      await fn()
    } catch (error: unknown) {
      mostOfResult = {
        ...this.formatError(error as Error, hook.sourceReference),
        status: TestStepResultStatus.FAILED,
      }
    }
    const endTime = this.stopwatch.now()

    this.onMessage({
      testRunHookFinished: {
        testRunHookStartedId: this.testRunStartedId,
        timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
          this.clock.now()
        ),
        result: {
          ...mostOfResult,
          duration: TimeConversion.millisecondsToDuration(endTime - startTime),
        },
      },
    })

    this.statuses.add(mostOfResult.status)

    return mostOfResult.status === TestStepResultStatus.PASSED
  }

  private async executeTestCase(testCase: AssembledTestCase) {
    const allowedAttempts = this.allowedRetries + 1
    let statuses = new Set<TestStepResultStatus>()

    for (let attempt = 1; attempt <= allowedAttempts; attempt++) {
      const testCaseStartedId = this.newId()
      this.onMessage({
        testCaseStarted: {
          id: testCaseStartedId,
          testCaseId: testCase.id,
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.clock.now()
          ),
          // attempt numbers are zero-indexed in messages
          attempt: attempt - 1,
        },
      })

      statuses = await this.executeTestCaseAttempt(testCase, testCaseStartedId)
      const willBeRetried =
        statuses.has(TestStepResultStatus.FAILED) && attempt < allowedAttempts

      this.onMessage({
        testCaseFinished: {
          testCaseStartedId,
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.clock.now()
          ),
          willBeRetried,
        },
      })

      if (!willBeRetried) {
        break
      }
    }

    statuses.forEach((status) => this.statuses.add(status))
  }

  private async executeTestCaseAttempt(
    testCase: AssembledTestCase,
    testCaseStartedId: string
  ) {
    const statuses = new Set<TestStepResultStatus>()
    const world = new World(this.clock, this.onMessage, testCaseStartedId)
    let outcomeKnown = false

    for (const testStep of testCase.testSteps) {
      this.onMessage({
        testStepStarted: {
          testCaseStartedId,
          testStepId: testStep.id,
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.clock.now()
          ),
        },
      })

      world.testStepId = testStep.id
      const testStepResult = await this.executeTestStep(
        testStep,
        world,
        outcomeKnown
      )
      statuses.add(testStepResult.status)
      if (testStepResult.status !== TestStepResultStatus.PASSED) {
        outcomeKnown = true
      }

      this.onMessage({
        testStepFinished: {
          testCaseStartedId,
          testStepId: testStep.id,
          testStepResult,
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.clock.now()
          ),
        },
      })
    }

    return statuses
  }

  private async executeTestStep(
    testStep: AssembledTestStep,
    world: World,
    outcomeKnown: boolean
  ): Promise<TestStepResult> {
    if (outcomeKnown && !testStep.always) {
      return {
        status: TestStepResultStatus.SKIPPED,
        duration: TimeConversion.millisecondsToDuration(0),
      }
    }

    let mostOfResult: Omit<TestStepResult, 'duration'> = {
      status: TestStepResultStatus.PASSED,
    }
    const startTime = this.stopwatch.now()
    try {
      const { fn, args } = testStep.prepare(world)
      const result = await fn(...args)
      if (result === 'pending') {
        mostOfResult = {
          status: TestStepResultStatus.PENDING,
          message: 'TODO',
        }
      } else if (result === 'skipped') {
        mostOfResult = {
          status: TestStepResultStatus.SKIPPED,
        }
      }
    } catch (error: unknown) {
      if (error instanceof AmbiguousError) {
        return {
          status: TestStepResultStatus.AMBIGUOUS,
          duration: TimeConversion.millisecondsToDuration(0),
          message: error.message,
        }
      } else if (error instanceof UndefinedError) {
        return {
          status: TestStepResultStatus.UNDEFINED,
          duration: TimeConversion.millisecondsToDuration(0),
        }
      }
      mostOfResult = {
        ...this.formatError(error as Error, testStep.sourceReference),
        status: TestStepResultStatus.FAILED,
      }
    }
    const endTime = this.stopwatch.now()
    return {
      ...mostOfResult,
      duration: TimeConversion.millisecondsToDuration(endTime - startTime),
    }
  }

  private formatError(error: Error, sourceReference: SourceReference) {
    const sourceFrame = `${sourceReference.uri}:${sourceReference.location?.line}`
    const type = error.name || 'Error'
    const message = error.message
    const stackTrace = type + ': ' + message + '\n' + sourceFrame
    return {
      message,
      exception: {
        type,
        message,
        stackTrace,
      },
    }
  }
}
