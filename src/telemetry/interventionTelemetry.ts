import type {
  EventLogger,
} from './EventLogger'

export interface InterventionTelemetryContext {
  readonly trialId:
    string

  readonly interventionEpisodeId:
    string
}

export function logInterventionRequested(
  logger: EventLogger,
  context:
    InterventionTelemetryContext,
  timestampMs: number,
) {
  return logger.log({
    eventType:
      'INTERVENTION_REQUESTED',

    trialId:
      context.trialId,

    timestampMs,

    source:
      'INTERVENTION_LAYER',

    payload: {
      interventionEpisodeId:
        context.interventionEpisodeId,
    },
  })
}

export function logInterventionPresented(
  logger: EventLogger,
  context:
    InterventionTelemetryContext,
  timestampMs: number,
) {
  return logger.log({
    eventType:
      'INTERVENTION_PRESENTED',

    trialId:
      context.trialId,

    timestampMs,

    source:
      'INTERVENTION_LAYER',

    payload: {
      interventionEpisodeId:
        context.interventionEpisodeId,
    },
  })
}

export function logInterventionAcknowledged(
  logger: EventLogger,
  context:
    InterventionTelemetryContext,
  timestampMs: number,
) {
  return logger.log({
    eventType:
      'INTERVENTION_ACKNOWLEDGED',

    trialId:
      context.trialId,

    timestampMs,

    source:
      'INTERVENTION_LAYER',

    payload: {
      interventionEpisodeId:
        context.interventionEpisodeId,
    },
  })
}

export function logInterventionCompleted(
  logger: EventLogger,
  context:
    InterventionTelemetryContext,
  timestampMs: number,
) {
  return logger.log({
    eventType:
      'INTERVENTION_COMPLETED',

    trialId:
      context.trialId,

    timestampMs,

    source:
      'INTERVENTION_LAYER',

    payload: {
      interventionEpisodeId:
        context.interventionEpisodeId,
    },
  })
}
