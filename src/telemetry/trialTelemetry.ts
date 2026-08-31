import type {
  EventLogger,
} from './EventLogger'

export interface TrialTelemetryContext {
  readonly trialId:
    string

  readonly conditionId?:
    string
}

export function logTrialStarted(
  logger: EventLogger,
  context: TrialTelemetryContext,
  timestampMs: number,
) {
  return logger.log({
    eventType:
      'TRIAL_STARTED',

    trialId:
      context.trialId,

    timestampMs,

    source:
      'TRIAL_CONTROLLER',

    payload: {
      ...(context.conditionId
        ? {
            conditionId:
              context.conditionId,
          }
        : {}),
    },
  })
}

export function logTrialCompleted(
  logger: EventLogger,
  context: TrialTelemetryContext,
  timestampMs: number,
) {
  return logger.log({
    eventType:
      'TRIAL_COMPLETED',

    trialId:
      context.trialId,

    timestampMs,

    source:
      'TRIAL_CONTROLLER',

    payload: {
      ...(context.conditionId
        ? {
            conditionId:
              context.conditionId,
          }
        : {}),
    },
  })
}
