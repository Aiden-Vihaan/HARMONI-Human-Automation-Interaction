import type {
  ScenarioEvent,
} from '../types/scenario'

import type {
  TrialState,
} from '../types/trial'

export function applyScenarioEvent(
  state: TrialState,
  event: ScenarioEvent,
): TrialState {
  switch (
    event.eventType
  ) {
    case 'AUTOMATION_STATUS_CHANGE': {
      const status =
        event.payload
          ?.status

      if (
        status !==
          'AUTONOMOUS' &&
        status !== 'LIMITED' &&
        status !==
          'REQUESTING_INTERVENTION' &&
        status !== 'MANUAL'
      ) {
        return state
      }

      return {
        ...state,
        automationStatus:
          status,
      }
    }

    case 'HAZARD_LEVEL_CHANGE': {
      const hazardLevel =
        event.payload
          ?.hazardLevel

      if (
        hazardLevel !==
          'NONE' &&
        hazardLevel !== 'LOW' &&
        hazardLevel !==
          'MODERATE' &&
        hazardLevel !== 'HIGH'
      ) {
        return state
      }

      return {
        ...state,
        hazardLevel,
      }
    }

    case 'INTERVENTION_REQUEST':
      return {
        ...state,
        phase:
          'INTERVENTION',
        automationStatus:
          'REQUESTING_INTERVENTION',
      }

    case 'TRIAL_COMPLETE':
      return {
        ...state,
        phase:
          'COMPLETED',
      }

    case 'OBJECT_APPEAR':
      return state

    default:
      return state
  }
}
