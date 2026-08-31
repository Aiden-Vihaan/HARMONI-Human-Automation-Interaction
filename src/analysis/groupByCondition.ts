import type {
  TrialAnalysis,
} from './types'

export function groupByCondition(
  trials:
    readonly TrialAnalysis[],
): ReadonlyMap<
  string,
  readonly TrialAnalysis[]
> {
  const groups =
    new Map<
      string,
      TrialAnalysis[]
    >()

  for (
    const trial of trials
  ) {
    const existing =
      groups.get(
        trial.conditionId,
      ) ?? []

    existing.push(
      trial,
    )

    groups.set(
      trial.conditionId,
      existing,
    )
  }

  return groups
}
