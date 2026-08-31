import type {
  TrialEvent,
} from '../types/events'

export function validateEventIntegrity(
  events:
    readonly TrialEvent[],
): readonly string[] {
  const issues: string[] = []

  const requested =
    events.find(
      event =>
        event.eventType ===
        'INTERVENTION_REQUESTED',
    )

  const presented =
    events.find(
      event =>
        event.eventType ===
        'INTERVENTION_PRESENTED',
    )

  const acknowledged =
    events.find(
      event =>
        event.eventType ===
        'INTERVENTION_ACKNOWLEDGED',
    )

  const completed =
    events.find(
      event =>
        event.eventType ===
        'INTERVENTION_COMPLETED',
    )

  if (
    acknowledged &&
    !presented
  ) {
    issues.push(
      'ACKNOWLEDGED_WITHOUT_PRESENTATION',
    )
  }

  if (
    acknowledged &&
    presented &&
    acknowledged.timestampMs <
      presented.timestampMs
  ) {
    issues.push(
      'ACKNOWLEDGED_BEFORE_PRESENTED',
    )
  }

  if (
    presented &&
    !requested
  ) {
    issues.push(
      'PRESENTED_WITHOUT_REQUEST',
    )
  }

  if (
    presented &&
    requested &&
    presented.timestampMs <
      requested.timestampMs
  ) {
    issues.push(
      'PRESENTED_BEFORE_REQUESTED',
    )
  }

  if (
    completed &&
    !presented
  ) {
    issues.push(
      'COMPLETED_WITHOUT_PRESENTATION',
    )
  }

  if (
    completed &&
    presented &&
    completed.timestampMs <
      presented.timestampMs
  ) {
    issues.push(
      'COMPLETED_BEFORE_PRESENTED',
    )
  }

  return issues
}
