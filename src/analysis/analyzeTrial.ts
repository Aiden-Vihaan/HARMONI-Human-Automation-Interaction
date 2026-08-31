import type {
  TrialEvent,
} from '../types/events'

import type {
  TrialAnalysis,
} from './types'

import {
  calculatePresentationLatency,
  calculateAcknowledgementLatency,
  calculateTakeoverLatency,
  countRejectedActions,
} from './temporalMeasures'

import {
  validateEventIntegrity,
} from './eventIntegrity'

export function analyzeTrial(
  trialId: string,
  events:
    readonly TrialEvent[],
): TrialAnalysis {
  const trialEvents =
    events.filter(
      event =>
        event.trialId ===
        trialId,
    )

  const interventionCompleted =
    trialEvents.some(
      event =>
        event.eventType ===
        'INTERVENTION_COMPLETED',
    )

  return {
    trialId,

    presentationLatencyMs:
      calculatePresentationLatency(
        trialEvents,
      ),

    acknowledgementLatencyMs:
      calculateAcknowledgementLatency(
        trialEvents,
      ),

    takeoverLatencyMs:
      calculateTakeoverLatency(
        trialEvents,
      ),

    interventionCompleted,

    rejectedActionCount:
      countRejectedActions(
        trialEvents,
      ),

    integrityIssues:
      validateEventIntegrity(
        trialEvents,
      ),
  }
}
