import type {
  TrialAnalysis,
} from './types'

import {
  summarizeMetric,
} from './statistics'

import type {
  ConditionSummary,
} from './conditionTypes'

export function analyzeCondition(
  conditionId: string,
  trials:
    readonly TrialAnalysis[],
): ConditionSummary {
  const conditionTrials =
    trials.filter(
      trial =>
        (
          trial as TrialAnalysis & {
            conditionId?: string
          }
        ).conditionId ===
        conditionId,
    )

  const completedTrialCount =
    conditionTrials.filter(
      trial =>
        trial.interventionCompleted,
    ).length

  const trialCount =
    conditionTrials.length

  return {
    conditionId,

    trialCount,

    completedTrialCount,

    completionRate:
      trialCount > 0
        ? completedTrialCount /
          trialCount
        : null,

    presentationLatency:
      summarizeMetric(
        conditionTrials.map(
          trial =>
            trial.presentationLatencyMs,
        ),
      ),

    acknowledgementLatency:
      summarizeMetric(
        conditionTrials.map(
          trial =>
            trial.acknowledgementLatencyMs,
        ),
      ),

    takeoverLatency:
      summarizeMetric(
        conditionTrials.map(
          trial =>
            trial.takeoverLatencyMs,
        ),
      ),

    rejectedActionCount:
      conditionTrials.reduce(
        (
          total,
          trial,
        ) =>
          total +
          trial.rejectedActionCount,
        0,
      ),

    integrityIssueTrialCount:
      conditionTrials.filter(
        trial =>
          trial.integrityIssues
            .length > 0,
      ).length,
  }
}
