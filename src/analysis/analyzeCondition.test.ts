import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  analyzeCondition,
} from './analyzeCondition'

import type {
  TrialAnalysis,
} from './types'

describe(
  'analyzeCondition',
  () => {
    it(
      'aggregates repeated trials within a condition',
      () => {
        const trials: TrialAnalysis[] =
          [
            {
              trialId:
                'trial-001',

              conditionId:
                'CONDITION-A',

              presentationLatencyMs:
                200,

              acknowledgementLatencyMs:
                1000,

              takeoverLatencyMs:
                4000,

              interventionCompleted:
                true,

              rejectedActionCount:
                0,

              integrityIssues: [],
            },

            {
              trialId:
                'trial-002',

              conditionId:
                'CONDITION-A',

              presentationLatencyMs:
                300,

              acknowledgementLatencyMs:
                1200,

              takeoverLatencyMs:
                5000,

              interventionCompleted:
                true,

              rejectedActionCount:
                1,

              integrityIssues: [],
            },

            {
              trialId:
                'trial-003',

              conditionId:
                'CONDITION-A',

              presentationLatencyMs:
                250,

              acknowledgementLatencyMs:
                null,

              takeoverLatencyMs:
                null,

              interventionCompleted:
                false,

              rejectedActionCount:
                2,

              integrityIssues: [],
            },
          ]

        const result =
          analyzeCondition(
            'CONDITION-A',
            trials,
          )

        expect(
          result.trialCount,
        ).toBe(3)

        expect(
          result.completedTrialCount,
        ).toBe(2)

        expect(
          result.completionRate,
        ).toBeCloseTo(
          2 / 3,
        )

        expect(
          result.presentationLatency.mean,
        ).toBe(250)

        expect(
          result.presentationLatency
            .validObservationCount,
        ).toBe(3)

        expect(
          result.acknowledgementLatency
            .validObservationCount,
        ).toBe(2)

        expect(
          result.takeoverLatency.mean,
        ).toBe(4500)

        expect(
          result.rejectedActionCount,
        ).toBe(3)

        expect(
          result.integrityIssueTrialCount,
        ).toBe(0)
      },
    )

    it(
      'handles an empty condition',
      () => {
        const result =
          analyzeCondition(
            'CONDITION-EMPTY',
            [],
          )

        expect(
          result.trialCount,
        ).toBe(0)

        expect(
          result.completedTrialCount,
        ).toBe(0)

        expect(
          result.completionRate,
        ).toBeNull()

        expect(
          result.takeoverLatency.mean,
        ).toBeNull()

        expect(
          result.takeoverLatency
            .validObservationCount,
        ).toBe(0)
      },
    )

    it(
      'tracks trials containing integrity issues',
      () => {
        const trials: TrialAnalysis[] =
          [
            {
              trialId:
                'trial-004',

              conditionId:
                'CONDITION-B',

              presentationLatencyMs:
                null,

              acknowledgementLatencyMs:
                null,

              takeoverLatencyMs:
                null,

              interventionCompleted:
                false,

              rejectedActionCount:
                0,

              integrityIssues: [
                'PRESENTED_BEFORE_REQUESTED',
              ],
            },
          ]

        const result =
          analyzeCondition(
            'CONDITION-B',
            trials,
          )

        expect(
          result.integrityIssueTrialCount,
        ).toBe(1)
      },
    )
  },
)
