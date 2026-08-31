import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createTrialRuntime,
} from './TrialRuntime'

import {
  createScenarioEventEngine,
} from './ScenarioEventEngine'

const scenarioEngine =
  createScenarioEventEngine({
    scenarioId:
      'runtime-test',

    name:
      'Runtime Test',

    durationMs:
      30000,

    events: [],
  })

describe(
  'TrialRuntime',
  () => {
    it(
      'does not progress before start',
      () => {
        const runtime =
          createTrialRuntime({
            scenarioEngine,

            onEvents() {},

            onComplete() {},
          })

        const state =
          runtime.update(
            1000,
          )

        expect(
          state.isRunning,
        ).toBe(false)

        expect(
          state.elapsedTimeMs,
        ).toBe(0)
      },
    )

    it(
      'starts with zero elapsed time',
      () => {
        const runtime =
          createTrialRuntime({
            scenarioEngine,

            onEvents() {},

            onComplete() {},
          })

        runtime.start()

        expect(
          runtime
            .getState()
            .isRunning,
        ).toBe(true)

        expect(
          runtime
            .getState()
            .elapsedTimeMs,
        ).toBe(0)
      },
    )

    it(
      'calculates elapsed time from the start reference',
      () => {
        const runtime =
          createTrialRuntime({
            scenarioEngine,

            onEvents() {},

            onComplete() {},
          })

        runtime.start()

        runtime.update(
          1000,
        )

        const state =
          runtime.update(
            3500,
          )

        expect(
          state.elapsedTimeMs,
        ).toBe(2500)
      },
    )

    it(
      'does not move elapsed time backwards',
      () => {
        const runtime =
          createTrialRuntime({
            scenarioEngine,

            onEvents() {},

            onComplete() {},
          })

        runtime.start()

        runtime.update(
          1000,
        )

        runtime.update(
          5000,
        )

        const state =
          runtime.update(
            3000,
          )

        expect(
          state.elapsedTimeMs,
        ).toBe(4000)
      },
    )

    it(
      'stops progression after stop',
      () => {
        const runtime =
          createTrialRuntime({
            scenarioEngine,

            onEvents() {},

            onComplete() {},
          })

        runtime.start()

        runtime.update(
          1000,
        )

        runtime.stop()

        const state =
          runtime.update(
            5000,
          )

        expect(
          state.isRunning,
        ).toBe(false)

        expect(
          state.elapsedTimeMs,
        ).toBe(0)
      },
    )
  },
)
