import { Clock } from './types'

export class DateClock implements Clock {
  now(): number {
    return Date.now()
  }
}
