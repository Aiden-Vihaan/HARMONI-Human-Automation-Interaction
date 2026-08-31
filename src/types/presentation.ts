```ts
export type InterventionPresentation =
  | 'HIDDEN'
  | 'VISIBLE'

export interface ParticipantPresentationState {
  readonly intervention:
    InterventionPresentation

  readonly automationLabel:
    string

  readonly interventionMessage:
    string | null

  readonly canAcknowledge:
    boolean

  readonly canTakeControl:
    boolean
}
