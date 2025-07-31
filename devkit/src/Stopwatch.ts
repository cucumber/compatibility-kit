export class Stopwatch {
  private time = 1000000

  public now(): number {
    return this.time++
  }
}
