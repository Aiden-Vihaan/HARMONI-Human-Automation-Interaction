import {
  mean,
  median,
  standardDeviation,
} from './statistics'

import type {
  ParticipantComparison,
  DifferenceDistribution,
} from './comparisonTypes'

export function summarizeDifferenceDistribution(
  comparisons:
    readonly ParticipantComparison[],
): DifferenceDistribution {
  const validDifferences =
    comparisons
      .map(
        comparison =>
          comparison.difference,
      )
      .filter(
        (
          value,
        ): value is number =>
          typeof value === 'number' &&
          Number.isFinite(value),
      )

  const positiveCount =
    validDifferences.filter(
      value =>
        value > 0,
    ).length

  const negativeCount =
    validDifferences.filter(
      value =>
        value < 0,
    ).length

  const zeroCount =
    validDifferences.filter(
      value =>
        value === 0,
    ).length

  const validCount =
    validDifferences.length

  return {
    metric:
      comparisons[0]?.metric ??
      'unknown',

    conditionA:
      comparisons[0]?.conditionA ??
      'unknown',

    conditionB:
      comparisons[0]?.conditionB ??
      'unknown',

    meanDifference:
      mean(validDifferences),

    medianDifference:
      median(validDifferences),

    minimumDifference:
      validCount > 0
        ? Math.min(
            ...validDifferences,
          )
        : null,

    maximumDifference:
      validCount > 0
        ? Math.max(
            ...validDifferences,
          )
        : null,

    standardDeviation:
      standardDeviation(
        validDifferences,
      ),

    validParticipantCount:
      validCount,

    missingParticipantCount:
      comparisons.length -
      validCount,

    positiveCount,

    negativeCount,

    zeroCount,

    positiveProportion:
      validCount > 0
        ? positiveCount /
          validCount
        : null,

    negativeProportion:
      validCount > 0
        ? negativeCount /
          validCount
        : null,

    zeroProportion:
      validCount > 0
        ? zeroCount /
          validCount
        : null,
  }
}
