import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  calculateStandardizedEffect,
  createEffectSummary,
} from './effectSize'

describe(
  'standardized effect analysis',
  () => {
    it(
      'calculates a positive standardized effect',
      () => {
        const effect =
          calculateStandardizedEffect(
            [
              100,
              200,
              300,
              400,
              500,
            ],
          )

        expect(effect).not.toBeNull()

        expect(
          effect!,
        ).toBeCloseTo(
          1.8974,
          3,
        )
      },
    )

    it(
      'preserves negative effect direction',
      () => {
        const effect =
          calculateStandardizedEffect(
            [
              -100,
              -200,
              -300,
              -400,
              -500,
            ],
          )

        expect(effect).not.toBeNull()

        expect(
          effect!,
        ).toBeCloseTo(
          -1.8974,
          3,
        )
      },
    )

    it(
      'returns null when variability is zero',
      () => {
        const effect =
          calculateStandardizedEffect(
            [
              300,
              300,
              300,
              300,
            ],
          )

        expect(effect).toBeNull()
      },
    )

    it(
      'returns null for one participant',
      () => {
        const effect =
          calculateStandardizedEffect(
            [300],
          )

        expect(effect).toBeNull()
      },
    )

    it(
      'returns null for empty input',
      () => {
        const effect =
          calculateStandardizedEffect(
            [],
          )

        expect(effect).toBeNull()
      },
    )

    it(
      'ignores null values',
      () => {
        const result =
          createEffectSummary(
            'takeoverLatency',
            'A',
            'B',
            [
              500,
              null,
              -200,
              100,
            ],
          )

        expect(
          result.validParticipantCount,
        ).toBe(3)

        expect(
          result.missingParticipantCount,
        ).toBe(1)

        expect(
          result.standardizedEffect,
        ).not.toBeNull()
      },
    )

    it(
      'rejects non-finite values',
      () => {
        const effect =
          calculateStandardizedEffect(
            [
              100,
              Number.NaN,
              200,
              Number.POSITIVE_INFINITY,
            ],
          )

        expect(effect).toBeNull()
      },
    )
  },
)
