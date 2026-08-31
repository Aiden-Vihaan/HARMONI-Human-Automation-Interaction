import type {
  ScenarioEventEngine,
} from './ScenarioEventEngine'

import type {
  TrialRuntime,
  TrialRuntimeState,
} from '../types/runtime'

export interface TrialRuntimeDependencies {
  readonly scenarioEngine:
    ScenarioEventEngine

  readonly onEvents:
    (
      elapsedTimeMs: number,
    ) => void

  readonly onComplete:
    () => void
}

export function createTrialRuntime(
  dependencies:
    TrialRuntimeDependencies,
): TrialRuntime {
  let state:
    TrialRuntimeState = {
      isRunning: false,
      elapsedTimeMs: 0,
    }

  let startTimeMs:
    number | null = null

  return {
    start() {
      if (state.isRunning) {
        return
      }

      startTimeMs = null

      state = {
        isRunning: true,
        elapsedTimeMs: 0,
      }
    },

    stop() {
      state = {
        ...state,
        isRunning: false,
      }
    },

    update(currentTimeMs) {
      if (!state.isRunning) {
        return state
      }

      if (startTimeMs === null) {
        startTimeMs =
          currentTimeMs
      }

      const elapsedTimeMs =
        Math.max(
          0,
          currentTimeMs -
            startTimeMs,
        )

      const previousTime =
        state.elapsedTimeMs

      if (
        elapsedTimeMs <
        previousTime
      ) {
        return state
      }

      state = {
        isRunning: true,
        elapsedTimeMs,
      }

      dependencies.onEvents(
        elapsedTimeMs,
      )

      return state
    },

    getState() {
      return state
    },
  }
}
