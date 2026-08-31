import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  validateEventIntegrity,
} from './eventIntegrity'

describe(
  'eventIntegrity',
  () => {
    it(
      'accepts a valid intervention sequence',
      () => {
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
              'INTERVENTION_COMPLETED',

            trialId:
              'trial-001',

            timestampMs:
              22000,

            sequenceNumber:
              3,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },
        ] as const

        expect(
          validateEventIntegrity(
            events,
          ),
        ).toEqual([])
      },
    )

    it(
      'detects acknowledgement without presentation',
      () => {
        const events = [
          {
            eventId:
              'evt-1',

            eventType:
              'INTERVENTION_ACKNOWLEDGED',

            trialId:
              'trial-001',

            timestampMs:
              20000,

            sequenceNumber:
              1,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },
        ] as const

        expect(
          validateEventIntegrity(
            events,
          ),
        ).toContain(
          'ACKNOWLEDGED_WITHOUT_PRESENTATION',
        )
      },
    )

    it(
      'detects presentation before request',
      () => {
        const events = [
          {
            eventId:
              'evt-1',

            eventType:
              'INTERVENTION_PRESENTED',

            trialId:
              'trial-001',

            timestampMs:
              10000,

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
              'INTERVENTION_REQUESTED',

            trialId:
              'trial-001',

            timestampMs:
              12000,

            sequenceNumber:
              2,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },
        ] as const

        expect(
          validateEventIntegrity(
            events,
          ),
        ).toContain(
          'PRESENTED_BEFORE_REQUESTED',
        )
      },
    )

    it(
      'detects completion before presentation',
      () => {
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
              'INTERVENTION_COMPLETED',

            trialId:
              'trial-001',

            timestampMs:
              17000,

            sequenceNumber:
              2,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },
        ] as const

        expect(
          validateEventIntegrity(
            events,
          ),
        ).toContain(
          'COMPLETED_WITHOUT_PRESENTATION',
        )
      },
    )
  },
)
