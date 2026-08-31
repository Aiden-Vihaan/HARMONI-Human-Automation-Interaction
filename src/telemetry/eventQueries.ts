import type {
  TrialEvent,
  TrialEventType,
} from '../types/events'

export function filterByEventType(
  events:
    readonly TrialEvent[],
  eventType:
    TrialEventType,
): readonly TrialEvent[] {
  return events.filter(
    event =>
      event.eventType ===
      eventType,
  )
}

export function filterBySource(
  events:
    readonly TrialEvent[],
  source:
    TrialEvent['source'],
): readonly TrialEvent[] {
  return events.filter(
    event =>
      event.source ===
      source,
  )
}

export function sortByTrialOrder(
  events:
    readonly TrialEvent[],
): readonly TrialEvent[] {
  return [...events].sort(
    (a, b) =>
      a.sequenceNumber -
      b.sequenceNumber,
  )
}
