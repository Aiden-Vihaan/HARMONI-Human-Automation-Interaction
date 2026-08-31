import type {
  TrialState,
} from '../types/trial'

import type {
  InterventionEpisode,
} from '../types/intervention'

import type {
  ParticipantPresentationState,
} from '../types/presentation'

export function createParticipantPresentation(
  trialState: TrialState,
  intervention:
    InterventionEpisode,
): ParticipantPresentationState {
  const communicationState =
    intervention.communicationState

  const interventionVisible =
    communicationState ===
      'REQUESTED' ||
    communicationState ===
      'PRESENTED' ||
    communicationState ===
      'ACKNOWLEDGED'

  return {
    intervention:
      interventionVisible
        ? 'VISIBLE'
        : 'HIDDEN',

    automationLabel:
      trialState.automationStatus,

    interventionMessage:
      interventionVisible
        ? 'Intervention required. Please take control when ready.'
        : null,

    canAcknowledge:
      communicationState ===
      'PRESENTED',

    canTakeControl:
      communicationState ===
        'PRESENTED' ||
      communicationState ===
        'ACKNOWLEDGED',
  }
}
