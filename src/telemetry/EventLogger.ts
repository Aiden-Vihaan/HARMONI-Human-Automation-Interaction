import type {
  EventSource,
  TrialEvent,
  TrialEventType,
} from '../types/events'

import {
  createEventId,
} from './createEventId'

export interface LogEventInput<
  TPayload = Record<string, unknown>,
> {
  readonly eventType:
    TrialEventType

  readonly trialId:
    string

  readonly timestampMs:
    number

  readonly source:
    EventSource

  readonly payload:
    TPayload
}

export interface EventLogger {
  log<TPayload>(
    input:
      LogEventInput<TPayload>,
  ): TrialEvent<TPayload>

  getAll():
    readonly TrialEvent[]

  getByTrial(
    trialId: string,
  ):
    readonly TrialEvent[]

  clear(): void
}

export function createEventLogger():
  EventLogger {
  const events:
    TrialEvent[] = []

  let sequenceNumber = 0

  return {
    log(input) {
      sequenceNumber += 1

      const event: TrialEvent =
        {
          eventId:
            createEventId(),

          eventType:
            input.eventType,

          trialId:
            input.trialId,

          timestampMs:
            input.timestampMs,

          sequenceNumber,

          source:
            input.source,

          payload:
            input.payload,
        }

      events.push(event)

      return event
    },

    getAll() {
      return [...events]
    },

    getByTrial(trialId) {
      return events.filter(
        event =>
          event.trialId ===
          trialId,
      )
    },

    clear() {
      events.length = 0
      sequenceNumber = 0
    },
  }
}
