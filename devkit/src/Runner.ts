import {
  AmbiguousError,
  AssembledTestCase,
  AssembledTestStep,
  DataTable,
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

import { Clock } from './Clock.js'
import { GlobalContext } from './GlobalContext.js'
import { makeSnippets } from './makeSnippets.js'
import { Stopwatch } from './Stopwatch.js'
import { World } from './World.js'

const NON_SUCCESS_STATUSES = new Set<TestStepResultStatus>([
  TestStepResultStatus.PENDING,
  TestStepResultStatus.UNDEFINED,
  TestStepResultStatus.AMBIGUOUS,
  TestStepResultStatus.FAILED,
])

export type RunnerOptions = {
  allowedRetries: number
  contriveError: boolean
  order: string
}

export class Runner {
  private readonly testRunStartedId: string
  private readonly statuses = new Set<TestStepResultStatus>()

  constructor(
    private readonly newId: IdGenerator.NewId,
    private readonly clock: Clock,
    private readonly stopwatch: Stopwatch,
    private readonly onMessage: (envelope: Envelope) => void,
    private readonly options: RunnerOptions,
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

    if (this.options.contriveError) {
      return this.markTestRunFinished(new Error('Whoops!'))
    }

    for (const hook of this.supportCodeLibrary.getAllBeforeAllHooks()) {
      await this.executeGlobalHook(hook)
    }

    // only run tests if no failures from BeforeAll hooks
    if (this.statuses.isDisjointFrom(NON_SUCCESS_STATUSES)) {
      const testCases = this.makeTestCases()
      for (const testCase of testCases) {
        await this.executeTestCase(testCase)
      }
    }

    for (const hook of this.supportCodeLibrary
      .getAllAfterAllHooks()
      .toReversed()) {
      await this.executeGlobalHook(hook)
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

  private markTestRunFinished(error?: Error) {
    let testRunFinished = {
      testRunStartedId: this.testRunStartedId,
      timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
        this.clock.now()
      ),
      success: this.statuses.isDisjointFrom(NON_SUCCESS_STATUSES),
    }
    if (error) {
      testRunFinished = {
        ...testRunFinished,
        ...this.formatError(error),
        success: false,
      }
    }
    this.onMessage({ testRunFinished })
  }

  private makeTestCases(): ReadonlyArray<AssembledTestCase> {
    const reordered = this.reorderPickledDocuments()

    const plans = reordered.map(({ gherkinDocument, pickles }) =>
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

  private reorderPickledDocuments() {
    switch (this.options.order) {
      case 'reverse':
        return this.pickledDocuments
          .toReversed()
          .map(({ gherkinDocument, pickles }) => {
            return {
              gherkinDocument,
              pickles: pickles.toReversed(),
            }
          })
      default:
        return this.pickledDocuments
    }
  }

  private async executeGlobalHook(hook: DefinedTestRunHook): Promise<void> {
    const testRunHookStartedId = this.newId()
    const context = new GlobalContext(
      this.clock,
      this.onMessage,
      testRunHookStartedId
    )

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
      await fn.call(context)
    } catch (error: unknown) {
      mostOfResult = {
        ...this.formatError(error as Error, hook.sourceReference),
        status: TestStepResultStatus.FAILED,
      }
    }
    const endTime = this.stopwatch.now()

    this.onMessage({
      testRunHookFinished: {
        testRunHookStartedId,
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
  }

  private async executeTestCase(testCase: AssembledTestCase) {
    const allowedAttempts = this.options.allowedRetries + 1
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
      const { fn, args, dataTable, docString } = testStep.prepare()
      const fnArgs: Array<unknown> = args.map((arg) => arg.getValue(world))
      if (dataTable) {
        fnArgs.push(DataTable.from(dataTable))
      } else if (docString) {
        fnArgs.push(docString.content)
      }
      const result = await fn.apply(world, fnArgs)
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
        }
      } else if (error instanceof UndefinedError) {
        this.onMessage({
          suggestion: {
            id: this.newId(),
            pickleStepId: error.pickleStep.id,
            snippets: makeSnippets(error.pickleStep, this.supportCodeLibrary),
          },
        })
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

  private formatError(error: Error, sourceReference?: SourceReference) {
    const sourceFrame = sourceReference
      ? `${sourceReference.uri}:${sourceReference.location?.line}`
      : '<unknown>'
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
