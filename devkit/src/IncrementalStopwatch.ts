import { Stopwatch } from './types'

export class IncrementalStopwatch implements Stopwatch {
  private time = 1000000

  public now(): number {
    return this.time++
  }
}
