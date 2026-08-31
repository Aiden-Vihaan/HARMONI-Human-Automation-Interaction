import type {
  ParticipantViewModel,
  TrialState,
} from '../types/trial'

const phaseLabels: Record<
  TrialState['phase'],
  string
> = {
  BRIEFING: 'BRIEFING',
  BASELINE: 'BASELINE',
  ACTIVE: 'ACTIVE',
  INTERVENTION:
    'INTERVENTION REQUESTED',
  COMPLETED: 'TRIAL COMPLETED',
}

export function trialToParticipantView(
  state: TrialState,
): ParticipantViewModel {
  return {
    automationStatus:
      state.automationStatus,

    hazardLevel:
      state.hazardLevel,

    environmentObjects:
      state.environmentObjects,

    canTakeControl:
      state.phase ===
      'INTERVENTION',

    phaseLabel:
      phaseLabels[state.phase],
  }
}
