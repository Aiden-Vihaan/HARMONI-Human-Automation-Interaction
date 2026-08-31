```ts
export interface TrialRuntimeState {
  readonly isRunning: boolean
  readonly elapsedTimeMs: number
}

export interface TrialRuntime {
  start(): void

  stop(): void

  update(
    currentTimeMs: number,
  ): TrialRuntimeState

  getState(): TrialRuntimeState
}
