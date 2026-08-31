export type ParticipantAction =
  | {
      readonly type:
        'ACKNOWLEDGE_INTERVENTION'

      readonly timestampMs:
        number
    }
  | {
      readonly type:
        'TAKE_CONTROL'

      readonly timestampMs:
        number
    }
