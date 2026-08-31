import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  mean,
  median,
  standardDeviation,
  summarizeMetric,
} from './statistics'

describe(
  'statistics',
  () => {
    it(
      'calculates mean',
      () => {
        expect(
          mean([
            100,
            200,
            300,
          ]),
        ).toBe(200)
      },
    )

    it(
      'calculates median for odd sample',
      () => {
        expect(
          median([
            100,
            300,
            200,
          ]),
        ).toBe(200)
      },
    )

    it(
      'calculates median for even sample',
      () => {
        expect(
          median([
            100,
            200,
            300,
            400,
          ]),
        ).toBe(250)
      },
    )

    it(
      'returns null for empty mean',
      () => {
        expect(
          mean([]),
        ).toBeNull()
      },
    )

    it(
      'returns null for empty median',
      () => {
        expect(
          median([]),
        ).toBeNull()
      },
    )

    it(
      'calculates sample standard deviation',
      () => {
        const result =
          standardDeviation([
            10,
            20,
            30,
          ])

        expect(
          result,
        ).toBeCloseTo(
          10,
          10,
        )
      },
    )

    it(
      'returns null when fewer than two observations exist',
      () => {
        expect(
          standardDeviation([
            100,
          ]),
        ).toBeNull()
      },
    )

    it(
      'distinguishes missing values from zero',
      () => {
        const summary =
          summarizeMetric([
            0,
            100,
            null,
          ])

        expect(
          summary.validObservationCount,
        ).toBe(2)

        expect(
          summary.missingObservationCount,
        ).toBe(1)

        expect(
          summary.mean,
        ).toBe(50)
      },
    )

    it(
      'does not include non-finite values',
      () => {
        const summary =
          summarizeMetric([
            100,
            Number.NaN,
            Number.POSITIVE_INFINITY,
            null,
          ])

        expect(
          summary.validObservationCount,
        ).toBe(1)

        expect(
          summary.missingObservationCount,
        ).toBe(3)
      },
    )
  },
)
