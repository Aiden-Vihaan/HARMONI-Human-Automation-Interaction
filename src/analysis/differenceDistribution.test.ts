import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  summarizeDifferenceDistribution,
} from './differenceDistribution'

import type {
  ParticipantComparison,
} from './comparisonTypes'

describe(
  'summarizeDifferenceDistribution',
  () => {
    it(
      'summarizes signed participant differences',
      () => {
        const comparisons:
          ParticipantComparison[] =
          [
            {
              participantId:
                'P001',
              conditionA:
                'A',
              conditionB:
                'B',
              metric:
                'takeoverLatency',
              conditionAValue:
                4000,
              conditionBValue:
                4500,
              difference:
                500,
              absoluteDifference:
                500,
              valid:
                true,
            },

            {
              participantId:
                'P002',
              conditionA:
                'A',
              conditionB:
                'B',
              metric:
                'takeoverLatency',
              conditionAValue:
                5000,
              conditionBValue:
                4800,
              difference:
                -200,
              absoluteDifference:
                200,
              valid:
                true,
            },

            {
              participantId:
                'P003',
              conditionA:
                'A',
              conditionB:
                'B',
              metric:
                'takeoverLatency',
              conditionAValue:
                6000,
              conditionBValue:
                6000,
              difference:
                0,
              absoluteDifference:
                0,
              valid:
                true,
            },

            {
              participantId:
                'P004',
              conditionA:
                'A',
              conditionB:
                'B',
              metric:
                'takeoverLatency',
              conditionAValue:
                null,
              conditionBValue:
                7000,
              difference:
                null,
              absoluteDifference:
                null,
              valid:
                false,
            },
          ]

        const result =
          summarizeDifferenceDistribution(
            comparisons,
          )

        expect(
          result.validParticipantCount,
        ).toBe(3)

        expect(
          result.missingParticipantCount,
        ).toBe(1)

        expect(
          result.positiveCount,
        ).toBe(1)

        expect(
          result.negativeCount,
        ).toBe(1)

        expect(
          result.zeroCount,
        ).toBe(1)

        expect(
          result.meanDifference,
        ).toBe(100)

        expect(
          result.medianDifference,
        ).toBe(0)
      },
    )

    it(
      'handles an empty distribution',
      () => {
        const result =
          summarizeDifferenceDistribution(
            [],
          )

        expect(
          result.validParticipantCount,
        ).toBe(0)

        expect(
          result.missingParticipantCount,
        ).toBe(0)

        expect(
          result.meanDifference,
        ).toBeNull()

        expect(
          result.medianDifference,
        ).toBeNull()

        expect(
          result.standardDeviation,
        ).toBeNull()

        expect(
          result.positiveProportion,
        ).toBeNull()
      },
    )
  },
)
