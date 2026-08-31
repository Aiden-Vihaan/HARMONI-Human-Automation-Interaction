import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  analyzeExperiment,
} from './analyzeExperiment'

import type {
  TrialAnalysis,
} from './types'

describe(
  'analyzeExperiment',
  () => {
    it(
      'separates trials by experimental condition',
      () => {
        const trials: TrialAnalysis[] =
          [
            {
              trialId:
                'trial-A1',

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
                'trial-A2',

              conditionId:
                'CONDITION-A',

              presentationLatencyMs:
                250,

              acknowledgementLatencyMs:
                1100,

              takeoverLatencyMs:
                4500,

              interventionCompleted:
                true,

              rejectedActionCount:
                1,

              integrityIssues: [],
            },

            {
              trialId:
                'trial-B1',

              conditionId:
                'CONDITION-B',

              presentationLatencyMs:
                300,

              acknowledgementLatencyMs:
                1500,

              takeoverLatencyMs:
                6000,

              interventionCompleted:
                true,

              rejectedActionCount:
                2,

              integrityIssues: [],
            },
          ]

        const result =
          analyzeExperiment(
            trials,
          )

        expect(
          result.totalTrialCount,
        ).toBe(3)

        expect(
          result.conditionSummaries,
        ).toHaveLength(2)

        const conditionA =
          result.conditionSummaries.find(
            summary =>
              summary.conditionId ===
              'CONDITION-A',
          )

        const conditionB =
          result.conditionSummaries.find(
            summary =>
              summary.conditionId ===
              'CONDITION-B',
          )

        expect(
          conditionA?.trialCount,
        ).toBe(2)

        expect(
          conditionA?.takeoverLatency.mean,
        ).toBe(4250)

        expect(
          conditionB?.trialCount,
        ).toBe(1)

        expect(
          conditionB?.takeoverLatency.mean,
        ).toBe(6000)
      },
    )
  },
)
