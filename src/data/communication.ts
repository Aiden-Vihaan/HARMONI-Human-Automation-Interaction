import type { Communication, Condition } from '../types/experiment'

export const communications: Record<Condition, Communication> = {
  STATE_ONLY: {
    condition: 'STATE_ONLY',
    stateMessage: 'AUTOMATION LIMITED',
    actionLabel: 'TAKE CONTROL',
  },

  STATE_AND_CONTEXT: {
    condition: 'STATE_AND_CONTEXT',
    stateMessage: 'AUTOMATION LIMITED',
    contextMessage: 'OBSTACLE DETECTED AHEAD',
    actionLabel: 'TAKE CONTROL',
  },

  STATE_CONTEXT_AND_REASON: {
    condition: 'STATE_CONTEXT_AND_REASON',
    stateMessage: 'AUTOMATION LIMITED',
    contextMessage: 'OBSTACLE DETECTED AHEAD',
    reasonMessage:
      'AUTOMATED CONTROL IS CURRENTLY UNABLE TO MANAGE THIS SITUATION',
    actionLabel: 'TAKE CONTROL',
  },
}
