import type {
  EventLogger,
} from './EventLogger'

export interface ParticipantTelemetryContext {
  readonly trialId:
    string
}

export function logParticipantAction(
  logger: EventLogger,
  context:
    ParticipantTelemetryContext,
  timestampMs: number,
  action: string,
) {
  return logger.log({
    eventType:
      'PARTICIPANT_ACTION',

    trialId:
      context.trialId,

    timestampMs,

    source:
      'PARTICIPANT_INTERFACE',

    payload: {
      action,
    },
  })
}
