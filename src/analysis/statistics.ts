```ts id="r5k1qv"
export interface MetricSummary {
  readonly mean: number | null

  readonly median: number | null

  readonly minimum: number | null

  readonly maximum: number | null

  readonly standardDeviation:
    number | null

  readonly validObservationCount:
    number

  readonly missingObservationCount:
    number
}

function validValues(
  values:
    readonly (number | null)[],
): number[] {
  return values.filter(
    (
      value,
    ): value is number =>
      typeof value === 'number' &&
      Number.isFinite(value),
  )
}

export function mean(
  values:
    readonly number[],
): number | null {
  if (values.length === 0) {
    return null
  }

  return (
    values.reduce(
      (
        total,
        value,
      ) =>
        total + value,
      0,
    ) /
    values.length
  )
}

export function median(
  values:
    readonly number[],
): number | null {
  if (values.length === 0) {
    return null
  }

  const sorted = [
    ...values,
  ].sort(
    (
      a,
      b,
    ) =>
      a - b,
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
      (
        sorted[middle - 1] +
        sorted[middle]
      ) /
      2
    )
  }

  return sorted[middle]
}

export function standardDeviation(
  values:
    readonly number[],
): number | null {
  if (
    values.length < 2
  ) {
    return null
  }

  const average =
    mean(values)

  if (
    average === null
  ) {
    return null
  }

  const squaredDifferences =
    values.map(
      value =>
        (value - average) ** 2,
    )

  const variance =
    squaredDifferences.reduce(
      (
        total,
        value,
      ) =>
        total + value,
      0,
    ) /
    (values.length - 1)

  return Math.sqrt(
    variance,
  )
}

export function summarizeMetric(
  values:
    readonly (number | null)[],
): MetricSummary {
  const valid =
    validValues(values)

  return {
    mean:
      mean(valid),

    median:
      median(valid),

    minimum:
      valid.length > 0
        ? Math.min(...valid)
        : null,

    maximum:
      valid.length > 0
        ? Math.max(...valid)
        : null,

    standardDeviation:
      standardDeviation(
        valid,
      ),

    validObservationCount:
      valid.length,

    missingObservationCount:
      values.length -
      valid.length,
  }
}
