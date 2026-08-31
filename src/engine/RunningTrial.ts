import {
  applyScenarioEvent,
} from './applyScenarioEvent'

import {
  createScenarioEventEngine,
} from './ScenarioEventEngine'

import {
  createTrialRuntime,
} from './TrialRuntime'

import type {
  ScenarioDefinition,
} from '../types/scenario'

import type {
  TrialState,
} from '../types/trial'

export interface RunningTrial {
  start(): void

  update(
    currentTimeMs: number,
  ): TrialState

  getState(): TrialState

  stop(): void
}

export function createRunningTrial(
  initialState: TrialState,
  scenario: ScenarioDefinition,
): RunningTrial {
  let state = initialState

  const scenarioEngine =
    createScenarioEventEngine(
      scenario,
    )

  const runtime =
    createTrialRuntime({
      scenarioEngine,

      onEvents(elapsedTimeMs) {
        const events =
          scenarioEngine.processUntil(
            elapsedTimeMs,
          )

        for (const event of events) {
          state =
            applyScenarioEvent(
              state,
              event,
            )
        }
      },

      onComplete() {
        // Reserved for future
        // automatic completion.
      },
    })

  return {
    start() {
      runtime.start()
    },

    update(currentTimeMs) {
      runtime.update(
        currentTimeMs,
      )

      return state
    },

    getState() {
      return state
    },

    stop() {
      runtime.stop()
    },
  }
}
