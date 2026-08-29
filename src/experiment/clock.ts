```ts
export interface Clock {
  now(): number
}

export class RealClock implements Clock {
  now(): number {
    return performance.now()
  }
}

export class FakeClock implements Clock {
  private currentTime = 0

  now(): number {
    return this.currentTime
  }

  advance(milliseconds: number): void {
    if (milliseconds < 0) {
      throw new Error(
        'FakeClock cannot move backwards.',
      )
    }

    this.currentTime += milliseconds
  }

  set(milliseconds: number): void {
    if (milliseconds < 0) {
      throw new Error(
        'FakeClock cannot be set to a negative value.',
      )
    }

    this.currentTime = milliseconds
  }

  reset(): void {
    this.currentTime = 0
  }
}
