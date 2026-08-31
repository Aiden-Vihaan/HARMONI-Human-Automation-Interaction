import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createTrialTrace,
} from './createTrialTrace'

describe(
  'createTrialTrace',
  () => {
    it(
      'creates a chronological trace for one trial',
      () => {
        const events = [
          {
            eventId:
              'evt-3',

            eventType:
              'INTERVENTION_PRESENTED',

            trialId:
              'trial-001',

            timestampMs:
              18200,

            sequenceNumber:
              3,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },

          {
            eventId:
              'evt-1',

            eventType:
              'TRIAL_STARTED',

            trialId:
              'trial-001',

            timestampMs:
              0,

            sequenceNumber:
              1,

            source:
              'TRIAL_CONTROLLER',

            payload: {},
          },

          {
            eventId:
              'evt-2',

            eventType:
              'INTERVENTION_REQUESTED',

            trialId:
              'trial-001',

            timestampMs:
              18000,

            sequenceNumber:
              2,

            source:
              'TRIAL_CONTROLLER',

            payload: {},
          },
        ] as const

        const trace =
          createTrialTrace(
            'trial-001',
            events,
          )

        expect(
          trace.events,
        ).toHaveLength(3)

        expect(
          trace.events[0].eventType,
        ).toBe(
          'TRIAL_STARTED',
        )

        expect(
          trace.events[1].eventType,
        ).toBe(
          'INTERVENTION_REQUESTED',
        )

        expect(
          trace.events[2].eventType,
        ).toBe(
          'INTERVENTION_PRESENTED',
        )
      },
    )
  },
)
