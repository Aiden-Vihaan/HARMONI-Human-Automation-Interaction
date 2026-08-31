import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createInterpretation,
} from './interpretation'

describe(
  'createInterpretation',
  () => {
    const baseContext = {
      metric:
        'takeover latency',
      conditionA:
        'CONDITION_A',
      conditionB:
        'CONDITION_B',
      meanDifference:
        420,
      standardizedEffect:
        1.25,
      standardDeviationOfDifferences:
        335,
      validParticipantCount:
        18,
      missingParticipantCount:
        2,
    }

    it(
      'describes a positive observed difference',
      () => {
        const result =
          createInterpretation(
            baseContext,
          )

        expect(
          result.observedResult,
        ).toContain(
          'higher observed takeover latency',
        )
      },
    )

    it(
      'describes a negative observed difference',
      () => {
        const result =
          createInterpretation({
            ...baseContext,
            meanDifference:
              -420,
          })

        expect(
          result.observedResult,
        ).toContain(
          'lower observed takeover latency',
        )
      },
    )

    it(
      'handles zero difference',
      () => {
        const result =
          createInterpretation({
            ...baseContext,
            meanDifference:
              0,
          })

        expect(
          result.observedResult,
        ).toContain(
          'No mean difference',
        )
      },
    )

    it(
      'handles undefined effect',
      () => {
        const result =
          createInterpretation({
            ...baseContext,
            standardizedEffect:
              null,
          })

        expect(
          result.effectStatement,
        ).toContain(
          'could not be estimated',
        )
      },
    )

    it(
      'reports missing participant pairs',
      () => {
        const result =
          createInterpretation(
            baseContext,
          )

        expect(
          result.dataQualityNote,
        ).toContain(
          '2 participant-condition pairs',
        )
      },
    )

    it(
      'does not make causal claims',
      () => {
        const result =
          createInterpretation(
            baseContext,
          )

        const text =
          JSON.stringify(
            result,
          ).toLowerCase()

        expect(
          text,
        ).not.toContain(
          'caused',
        )

        expect(
          text,
        ).not.toContain(
          'statistically significant',
        )
      },
    )
  },
)
