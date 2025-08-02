export class Clock {
  private time = 0

  public now(): number {
    return this.time++
  }
}
