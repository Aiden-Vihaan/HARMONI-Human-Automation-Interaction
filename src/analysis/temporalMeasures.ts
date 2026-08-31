import type {
  TrialEvent,
} from '../types/events'

function findEvent(
  events: readonly TrialEvent[],
  eventType: TrialEvent['eventType'],
): TrialEvent | undefined {
  return events.find(
    event =>
      event.eventType ===
      eventType,
  )
}

export function calculateLatency(
  startEvent:
    TrialEvent | undefined,
  endEvent:
    TrialEvent | undefined,
): number | null {
  if (
    !startEvent ||
    !endEvent
  ) {
    return null
  }

  const latency =
    endEvent.timestampMs -
    startEvent.timestampMs

  if (latency < 0) {
    return null
  }

  return latency
}

export function calculatePresentationLatency(
  events:
    readonly TrialEvent[],
): number | null {
  return calculateLatency(
    findEvent(
      events,
      'INTERVENTION_REQUESTED',
    ),
    findEvent(
      events,
      'INTERVENTION_PRESENTED',
    ),
  )
}

export function calculateAcknowledgementLatency(
  events:
    readonly TrialEvent[],
): number | null {
  return calculateLatency(
    findEvent(
      events,
      'INTERVENTION_PRESENTED',
    ),
    findEvent(
      events,
      'INTERVENTION_ACKNOWLEDGED',
    ),
  )
}

export function calculateTakeoverLatency(
  events:
    readonly TrialEvent[],
): number | null {
  return calculateLatency(
    findEvent(
      events,
      'INTERVENTION_PRESENTED',
    ),
    findEvent(
      events,
      'INTERVENTION_COMPLETED',
    ),
  )
}

export function countRejectedActions(
  events:
    readonly TrialEvent[],
): number {
  return events.filter(
    event =>
      event.eventType ===
      'PARTICIPANT_ACTION_REJECTED',
  ).length
}
