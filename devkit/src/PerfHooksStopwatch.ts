import { Stopwatch } from './types'

export class PerfHooksStopwatch implements Stopwatch {
  now(): number {
    return performance.now()
  }
}
