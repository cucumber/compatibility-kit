import { Clock } from './types'

export class IncrementalClock implements Clock {
  private time = 0

  public now(): number {
    return this.time++
  }
}
