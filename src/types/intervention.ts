```ts
export type InterventionCommunicationState =
  | 'IDLE'
  | 'REQUESTED'
  | 'PRESENTED'
  | 'ACKNOWLEDGED'
  | 'COMPLETED'

export type InterventionAction =
  | 'ACKNOWLEDGE_INTERVENTION'
  | 'TAKE_CONTROL'

export interface InterventionEpisode {
  readonly interventionEpisodeId: string

  readonly communicationState:
    InterventionCommunicationState

  readonly requestedAtMs:
    number | null

  readonly presentedAtMs:
    number | null

  readonly acknowledgedAtMs:
    number | null

  readonly completedAtMs:
    number | null
}
