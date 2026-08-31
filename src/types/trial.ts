export type TrialPhase =
  | 'BRIEFING'
  | 'BASELINE'
  | 'ACTIVE'
  | 'INTERVENTION'
  | 'COMPLETED'

export type ParticipantActionType =
  | 'TAKE_CONTROL'

export interface ParticipantAction {
  readonly type: ParticipantActionType
}

export interface TrialState {
  readonly trialId: string
  readonly trialNumber: number
  readonly phase: TrialPhase
  readonly automationStatus:
    | 'AUTONOMOUS'
    | 'LIMITED'
    | 'REQUESTING_INTERVENTION'
    | 'MANUAL'
  readonly hazardLevel:
    | 'NONE'
    | 'LOW'
    | 'MODERATE'
    | 'HIGH'
  readonly environmentObjects: readonly unknown[]
}

export interface ParticipantViewModel {
  readonly automationStatus:
    | 'AUTONOMOUS'
    | 'LIMITED'
    | 'REQUESTING_INTERVENTION'
    | 'MANUAL'

  readonly hazardLevel:
    | 'NONE'
    | 'LOW'
    | 'MODERATE'
    | 'HIGH'

  readonly environmentObjects: readonly unknown[]

  readonly canTakeControl: boolean

  readonly phaseLabel: string
}
