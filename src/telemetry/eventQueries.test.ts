import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  filterByEventType,
  filterBySource,
  sortByTrialOrder,
} from './eventQueries'

describe(
  'eventQueries',
  () => {
    const events = [
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
          'evt-3',

        eventType:
          'PARTICIPANT_ACTION',

        trialId:
          'trial-001',

        timestampMs:
          20000,

        sequenceNumber:
          4,

        source:
          'PARTICIPANT_INTERFACE',

        payload: {},
      },
    ] as const

    it(
      'filters by event type',
      () => {
        const result =
          filterByEventType(
            events,
            'PARTICIPANT_ACTION',
          )

        expect(
          result,
        ).toHaveLength(1)
      },
    )

    it(
      'filters by source',
      () => {
        const result =
          filterBySource(
            events,
            'INTERVENTION_LAYER',
          )

        expect(
          result,
        ).toHaveLength(1)
      },
    )

    it(
      'sorts events by sequence',
      () => {
        const result =
          sortByTrialOrder([
            events[2],
            events[0],
            events[1],
          ])

        expect(
          result[0].sequenceNumber,
        ).toBe(1)

        expect(
          result[1].sequenceNumber,
        ).toBe(3)

        expect(
          result[2].sequenceNumber,
        ).toBe(4)
      },
    )
  },
)
