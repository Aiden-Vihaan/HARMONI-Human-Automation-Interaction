import type {
  ParticipantAction,
  TrialState,
} from '../types/trial'

import type {
  TrialEvent,
} from '../types/events'

export interface TrialController {
  getState(): TrialState

  dispatch(
    action: ParticipantAction,
  ): TrialEvent | null
}

function createEventId(): string {
  return `evt_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`
}

export function createTrialController(
  initialState: TrialState,
): TrialController {
  let state = initialState

  return {
    getState() {
      return state
    },

    dispatch(action) {
      if (
        action.type ===
        'TAKE_CONTROL'
      ) {
        if (
          state.phase !==
          'INTERVENTION'
        ) {
          return null
        }

        const event: TrialEvent = {
          eventId: createEventId(),
          trialId: state.trialId,
          eventType:
            'PARTICIPANT_ACTION',
          timestamp: Date.now(),
          trialPhase: state.phase,
          actionType:
            action.type,
          automationStatus:
            state.automationStatus,
        }

        state = {
          ...state,
          phase: 'COMPLETED',
          automationStatus: 'MANUAL',
        }

        return event
      }

      return null
    },
  }
}
