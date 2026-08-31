import type {
  TrialAnalysis,
} from './types'

import type {
  ConditionSummary,
} from './conditionTypes'

import {
  groupByCondition,
} from './groupByCondition'

import {
  analyzeCondition,
} from './analyzeCondition'

export interface ExperimentAnalysis {
  readonly totalTrialCount:
    number

  readonly conditionSummaries:
    readonly ConditionSummary[]
}

export function analyzeExperiment(
  trials:
    readonly TrialAnalysis[],
): ExperimentAnalysis {
  const groups =
    groupByCondition(
      trials,
    )

  const conditionSummaries =
    Array.from(
      groups.entries(),
    ).map(
      (
        [
          conditionId,
          conditionTrials,
        ],
      ) =>
        analyzeCondition(
          conditionId,
          conditionTrials,
        ),
    )

  return {
    totalTrialCount:
      trials.length,

    conditionSummaries,
  }
}
