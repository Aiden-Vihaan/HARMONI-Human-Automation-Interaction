import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  analyzeTrial,
} from './analyzeTrial'

describe(
  'analyzeTrial',
  () => {
    it(
      'produces complete temporal measures',
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
              'INTERVENTION_REQUESTED',

            trialId:
              'trial-001',

            timestampMs:
              18000,

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
              'evt-4',

            eventType:
              'INTERVENTION_ACKNOWLEDGED',

            trialId:
              'trial-001',

            timestampMs:
              20500,

            sequenceNumber:
              4,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },

          {
            eventId:
              'evt-5',

            eventType:
              'INTERVENTION_COMPLETED',

            trialId:
              'trial-001',

            timestampMs:
              23100,

            sequenceNumber:
              5,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },
        ] as const

        const result =
          analyzeTrial(
            'trial-001',
            events,
          )

        expect(
          result.trialId,
        ).toBe(
          'trial-001',
        )

        expect(
          result.presentationLatencyMs,
        ).toBe(200)

        expect(
          result.acknowledgementLatencyMs,
        ).toBe(2300)

        expect(
          result.takeoverLatencyMs,
        ).toBe(4900)

        expect(
          result.interventionCompleted,
        ).toBe(true)

        expect(
          result.rejectedActionCount,
        ).toBe(0)

        expect(
          result.integrityIssues,
        ).toEqual([])
      },
    )

    it(
      'handles incomplete intervention data',
      () => {
        const events = [
          {
            eventId:
              'evt-1',

            eventType:
              'INTERVENTION_REQUESTED',

            trialId:
              'trial-002',

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
              'trial-002',

            timestampMs:
              18200,

            sequenceNumber:
              2,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },
        ] as const

        const result =
          analyzeTrial(
            'trial-002',
            events,
          )

        expect(
          result.presentationLatencyMs,
        ).toBe(200)

        expect(
          result.acknowledgementLatencyMs,
        ).toBeNull()

        expect(
          result.takeoverLatencyMs,
        ).toBeNull()

        expect(
          result.interventionCompleted,
        ).toBe(false)
      },
    )

    it(
      'ignores events belonging to another trial',
      () => {
        const events = [
          {
            eventId:
              'evt-1',

            eventType:
              'INTERVENTION_REQUESTED',

            trialId:
              'trial-A',

            timestampMs:
              1000,

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
              'trial-B',

            timestampMs:
              2000,

            sequenceNumber:
              2,

            source:
              'INTERVENTION_LAYER',

            payload: {},
          },
        ] as const

        const result =
          analyzeTrial(
            'trial-A',
            events,
          )

        expect(
          result.presentationLatencyMs,
        ).toBeNull()
      },
    )
  },
)
