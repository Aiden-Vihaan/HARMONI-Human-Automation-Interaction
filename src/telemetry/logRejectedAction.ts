import type {
  EventLogger,
} from './EventLogger'

export interface RejectedActionDetails {
  readonly action:
    string

  readonly reason:
    string
}

export function logRejectedAction(
  logger: EventLogger,
  trialId: string,
  timestampMs: number,
  details:
    RejectedActionDetails,
) {
  return logger.log({
    eventType:
      'PARTICIPANT_ACTION_REJECTED',

    trialId,

    timestampMs,

    source:
      'TRIAL_CONTROLLER',

    payload: {
      action:
        details.action,

      reason:
        details.reason,
    },
  })
}
