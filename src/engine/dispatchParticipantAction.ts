import type {
  ParticipantAction,
} from '../types/participant'

import type {
  InterventionCommunication,
} from './InterventionCommunication'

export function dispatchParticipantAction(
  communication:
    InterventionCommunication,
  action:
    ParticipantAction,
): boolean {
  switch (action.type) {
    case 'ACKNOWLEDGE_INTERVENTION': {
      if (
        !communication.canPerformAction(
          'ACKNOWLEDGE_INTERVENTION',
        )
      ) {
        return false
      }

      communication.acknowledge(
        action.timestampMs,
      )

      return true
    }

    case 'TAKE_CONTROL': {
      if (
        !communication.canPerformAction(
          'TAKE_CONTROL',
        )
      ) {
        return false
      }

      communication.complete(
        action.timestampMs,
      )

      return true
    }

    default:
      return false
  }
}
