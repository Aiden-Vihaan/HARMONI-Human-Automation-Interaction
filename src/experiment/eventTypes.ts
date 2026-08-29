export interface ParticipantActionMetadata {
  action: 'TAKE_CONTROL' | 'INVALID_ACTION' | 'TIMEOUT'
}

export interface AutomationStateMetadata {
  previousState: 'AUTONOMOUS' | 'LIMITED'
  nextState: 'AUTONOMOUS' | 'LIMITED'
}

export interface CommunicationMetadata {
  condition:
    | 'STATE_ONLY'
    | 'STATE_AND_CONTEXT'
    | 'STATE_CONTEXT_AND_REASON'
  messageVersion: string
}

export interface ErrorMetadata {
  code: string
  message: string
  recoverable: boolean
}
