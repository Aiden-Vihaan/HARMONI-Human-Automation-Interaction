import type {
  ParticipantActionType,
  TrialPhase,
} from './trial'

export type TrialEventType =
  | 'PARTICIPANT_ACTION'
  | 'STATE_TRANSITION'

export interface TrialEvent {
  readonly eventId: string
  readonly trialId: string
  readonly eventType: TrialEventType
  readonly timestamp: number
  readonly trialPhase: TrialPhase
  readonly actionType?: ParticipantActionType
  readonly automationStatus:
    | 'AUTONOMOUS'
    | 'LIMITED'
    | 'REQUESTING_INTERVENTION'
    | 'MANUAL'
}
