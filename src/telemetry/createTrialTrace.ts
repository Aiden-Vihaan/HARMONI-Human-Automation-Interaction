import type {
  TrialEvent,
} from '../types/events'

export interface TrialTrace {
  readonly trialId:
    string

  readonly events:
    readonly TrialEvent[]
}

export function createTrialTrace(
  trialId: string,
  events:
    readonly TrialEvent[],
): TrialTrace {
  return {
    trialId,

    events: [...events]
      .filter(
        event =>
          event.trialId ===
          trialId,
      )
      .sort(
        (a, b) =>
          a.sequenceNumber -
          b.sequenceNumber,
      ),
  }
}
