import type {
  EffectSummary,
} from './effectTypes'

export function calculateMean(
  values: readonly number[],
): number | null {
  if (values.length === 0) {
    return null
  }

  const total =
    values.reduce(
      (sum, value) =>
        sum + value,
      0,
    )

  return total / values.length
}

export function calculateSampleStandardDeviation(
  values: readonly number[],
): number | null {
  if (values.length < 2) {
    return null
  }

  const mean =
    calculateMean(values)

  if (mean === null) {
    return null
  }

  const squaredDifferences =
    values.map(
      value =>
        (value - mean) ** 2,
    )

  const variance =
    squaredDifferences.reduce(
      (sum, value) =>
        sum + value,
      0,
    ) /
    (values.length - 1)

  const deviation =
    Math.sqrt(variance)

  return Number.isFinite(
    deviation,
  )
    ? deviation
    : null
}

export function calculateStandardizedEffect(
  differences:
    readonly number[],
): number | null {
  const validDifferences =
    differences.filter(
      value =>
        Number.isFinite(value),
    )

  if (
    validDifferences.length < 2
  ) {
    return null
  }

  const mean =
    calculateMean(
      validDifferences,
    )

  const standardDeviation =
    calculateSampleStandardDeviation(
      validDifferences,
    )

  if (
    mean === null ||
    standardDeviation === null ||
    standardDeviation <= 0
  ) {
    return null
  }

  const effect =
    mean /
    standardDeviation

  return Number.isFinite(effect)
    ? effect
    : null
}

export function createEffectSummary(
  metric: string,
  conditionA: string,
  conditionB: string,
  differences:
    readonly (
      | number
      | null
    )[],
): EffectSummary {
  const validDifferences =
    differences.filter(
      (
        value,
      ): value is number =>
        typeof value === 'number' &&
        Number.isFinite(value),
    )

  const meanDifference =
    calculateMean(
      validDifferences,
    )

  const standardDeviationOfDifferences =
    calculateSampleStandardDeviation(
      validDifferences,
    )

  const standardizedEffect =
    calculateStandardizedEffect(
      validDifferences,
    )

  return {
    metric,

    conditionA,

    conditionB,

    meanDifference,

    standardDeviationOfDifferences,

    standardizedEffect,

    absoluteStandardizedEffect:
      standardizedEffect === null
        ? null
        : Math.abs(
            standardizedEffect,
          ),

    validParticipantCount:
      validDifferences.length,

    missingParticipantCount:
      differences.length -
      validDifferences.length,
  }
}
