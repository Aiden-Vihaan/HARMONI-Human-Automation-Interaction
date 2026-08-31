import type {
  MetricSummary,
} from './statistics'

export interface ConditionSummary {
  readonly conditionId:
    string

  readonly trialCount:
    number

  readonly completedTrialCount:
    number

  readonly completionRate:
    number | null

  readonly presentationLatency:
    MetricSummary

  readonly acknowledgementLatency:
    MetricSummary

  readonly takeoverLatency:
    MetricSummary

  readonly rejectedActionCount:
    number

  readonly integrityIssueTrialCount:
    number
}
