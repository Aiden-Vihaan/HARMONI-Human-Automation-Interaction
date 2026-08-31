import type {
  ExtremeObservation,
  QualityControlSummary,
} from './qualityControlTypes'

function finiteValues(
  values: readonly number[],
): number[] {
  return values.filter(
    value =>
      Number.isFinite(value),
  )
}

export function calculateMedian(
  values: readonly number[],
): number | null {
  const valid =
    finiteValues(values)

  if (valid.length === 0) {
    return null
  }

  const sorted =
    [...valid].sort(
      (a, b) => a - b,
    )

  const middle =
    Math.floor(
      sorted.length / 2,
    )

  if (
    sorted.length % 2 ===
    0
  ) {
    return (
      sorted[middle - 1] +
      sorted[middle]
    ) / 2
  }

  return sorted[middle]
}

export function calculateQuartile(
  values: readonly number[],
  percentile: number,
): number | null {
  const valid =
    finiteValues(values)

  if (valid.length === 0) {
    return null
  }

  const sorted =
    [...valid].sort(
      (a, b) => a - b,
    )

  const position =
    (sorted.length - 1) *
    percentile

  const lower =
    Math.floor(position)

  const upper =
    Math.ceil(position)

  if (lower === upper) {
    return sorted[lower]
  }

  const weight =
    position - lower

  return (
    sorted[lower] *
      (1 - weight) +
    sorted[upper] * weight
  )
}

export function detectPotentialExtremeObservations(
  values: readonly number[],
): ExtremeObservation[] {
  const valid =
    finiteValues(values)

  if (
    valid.length < 4
  ) {
    return []
  }

  const q1 =
    calculateQuartile(
      valid,
      0.25,
    )

  const q3 =
    calculateQuartile(
      valid,
      0.75,
    )

  if (
    q1 === null ||
    q3 === null
  ) {
    return []
  }

  const iqr =
    q3 - q1

  if (iqr <= 0) {
    return []
  }

  const lowerBoundary =
    q1 - 1.5 * iqr

  const upperBoundary =
    q3 + 1.5 * iqr

  return valid
    .map(
      (value, index) => ({
        index,
        value,
        lowerBoundary,
        upperBoundary,
      }),
    )
    .filter(
      observation =>
        observation.value <
          lowerBoundary ||
        observation.value >
          upperBoundary,
    )
}

export function createQualityControlSummary(
  totalParticipantCount: number,
  differences:
    readonly (
      | number
      | null
    )[],
): QualityControlSummary {
  const valid =
    differences.filter(
      (
        value,
      ): value is number =>
        typeof value ===
          'number' &&
        Number.isFinite(value),
    )

  const missing =
    differences.length -
    valid.length

  const positive =
    valid.filter(
      value => value > 0,
    ).length

  const negative =
    valid.filter(
      value => value < 0,
    ).length

  const zero =
    valid.filter(
      value => value === 0,
    ).length

  const mean =
    valid.length > 0
      ? valid.reduce(
          (sum, value) =>
            sum + value,
          0,
        ) /
        valid.length
      : null

  const median =
    calculateMedian(valid)

  return {
    totalParticipantCount,

    validParticipantCount:
      valid.length,

    missingParticipantCount:
      missing,

    completenessPercentage:
      totalParticipantCount >
      0
        ? (valid.length /
            totalParticipantCount) *
          100
        : 0,

    positiveDifferenceCount:
      positive,

    negativeDifferenceCount:
      negative,

    zeroDifferenceCount:
      zero,

    potentialExtremeObservationCount:
      detectPotentialExtremeObservations(
        valid,
      ).length,

    meanDifference: mean,

    medianDifference: median,

    meanMedianGap:
      mean !== null &&
      median !== null
        ? mean - median
        : null,
  }
}
