import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  calculatePresentationLatency,
  calculateAcknowledgementLatency,
  calculateTakeoverLatency,
  countRejectedActions,
} from './temporalMeasures'

const events = [
  {
    eventId:
      'evt-1',

    eventType:
      'INTERVENTION_REQUESTED',

    trialId:
      'trial-001',

    timestampMs:
      18000,

    sequenceNumber:
      1,

    source:
      'INTERVENTION_LAYER',

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
      2,

    source:
      'INTERVENTION_LAYER',

    payload: {},
  },

  {
    eventId:
      'evt-3',

    eventType:
      'INTERVENTION_ACKNOWLEDGED',

    trialId:
      'trial-001',

    timestampMs:
      20500,

    sequenceNumber:
      3,

    source:
      'INTERVENTION_LAYER',

    payload: {},
  },

  {
    eventId:
      'evt-4',

    eventType:
      'INTERVENTION_COMPLETED',

    trialId:
      'trial-001',

    timestampMs:
      23100,

    sequenceNumber:
      4,

    source:
      'INTERVENTION_LAYER',

    payload: {},
  },
] as const

describe(
  'temporalMeasures',
  () => {
    it(
      'calculates presentation latency',
      () => {
        expect(
          calculatePresentationLatency(
            events,
          ),
        ).toBe(200)
      },
    )

    it(
      'calculates acknowledgement latency',
      () => {
        expect(
          calculateAcknowledgementLatency(
            events,
          ),
        ).toBe(2300)
      },
    )

    it(
      'calculates takeover latency',
      () => {
        expect(
          calculateTakeoverLatency(
            events,
          ),
        ).toBe(4900)
      },
    )

    it(
      'returns null when required event is missing',
      () => {
        expect(
          calculateAcknowledgementLatency(
            events.filter(
              event =>
                event.eventType !==
                'INTERVENTION_ACKNOWLEDGED',
            ),
          ),
        ).toBeNull()
      },
    )

    it(
      'counts rejected actions',
      () => {
        const rejected =
          {
            ...events[0],

            eventId:
              'evt-rejected',

            eventType:
              'PARTICIPANT_ACTION_REJECTED',
          } as const

        expect(
          countRejectedActions([
            ...events,
            rejected,
          ]),
        ).toBe(1)
      },
    )
  },
)
