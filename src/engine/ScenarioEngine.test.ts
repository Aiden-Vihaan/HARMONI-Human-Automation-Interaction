import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createScenarioEventEngine,
} from './ScenarioEventEngine'

import type {
  ScenarioDefinition,
} from '../types/scenario'

const scenario:
  ScenarioDefinition = {
  scenarioId: 'test-scenario',

  name: 'Test Scenario',

  durationMs: 30000,

  events: [
    {
      eventId: 'event-1',
      triggerTimeMs: 10000,
      eventType:
        'AUTOMATION_STATUS_CHANGE',
    },

    {
      eventId: 'event-2',
      triggerTimeMs: 15000,
      eventType:
        'HAZARD_LEVEL_CHANGE',
    },

    {
      eventId: 'event-3',
      triggerTimeMs: 18000,
      eventType:
        'INTERVENTION_REQUEST',
    },
  ],
}

describe(
  'ScenarioEventEngine',
  () => {
    it(
      'does not process future events',
      () => {
        const engine =
          createScenarioEventEngine(
            scenario,
          )

        const events =
          engine.processUntil(
            5000,
          )

        expect(events).toHaveLength(
          0,
        )
      },
    )

    it(
      'processes events when their trigger time is reached',
      () => {
        const engine =
          createScenarioEventEngine(
            scenario,
          )

        const events =
          engine.processUntil(
            10000,
          )

        expect(events).toHaveLength(
          1,
        )

        expect(
          events[0].eventId,
        ).toBe('event-1')
      },
    )

    it(
      'processes every event crossed by a time jump',
      () => {
        const engine =
          createScenarioEventEngine(
            scenario,
          )

        const events =
          engine.processUntil(
            19000,
          )

        expect(events).toHaveLength(
          3,
        )

        expect(
          events.map(
            (event) =>
              event.eventId,
          ),
        ).toEqual([
          'event-1',
          'event-2',
          'event-3',
        ])
      },
    )

    it(
      'does not process an event twice',
      () => {
        const engine =
          createScenarioEventEngine(
            scenario,
          )

        engine.processUntil(
          19000,
        )

        const events =
          engine.processUntil(
            20000,
          )

        expect(events).toHaveLength(
          0,
        )
      },
    )

    it(
      'does not move backwards in scenario time',
      () => {
        const engine =
          createScenarioEventEngine(
            scenario,
          )

        engine.processUntil(
          19000,
        )

        const events =
          engine.processUntil(
            5000,
          )

        expect(events).toHaveLength(
          0,
        )

        expect(
          engine.getElapsedTimeMs(),
        ).toBe(19000)
      },
    )
  },
)
