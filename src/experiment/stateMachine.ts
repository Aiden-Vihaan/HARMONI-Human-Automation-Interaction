import type { TrialState } from '../types/experiment'

export type TransitionEvent =
  | 'START'
  | 'ENVIRONMENT_TRIGGER'
  | 'CRITICAL_EVENT'
  | 'COMMUNICATION_DISPLAYED'
  | 'PARTICIPANT_INTERVENTION'
  | 'RESPONSE_TIMEOUT'
  | 'OUTCOME_RECORDED'
  | 'SA_COMPLETE'
  | 'WORKLOAD_COMPLETE'
  | 'ABORT'

export interface TransitionRecord {
  from: TrialState
  to: TrialState
  event: TransitionEvent
  timestamp: number
}

const transitions: Record<
  TrialState,
  Partial<Record<TransitionEvent, TrialState>>
> = {
  INITIALISING: {
    START: 'AUTONOMOUS',
    ABORT: 'TRIAL_ABORTED',
  },

  AUTONOMOUS: {
    ENVIRONMENT_TRIGGER: 'ENVIRONMENT_DEVELOPING',
    ABORT: 'TRIAL_ABORTED',
  },

  ENVIRONMENT_DEVELOPING: {
    CRITICAL_EVENT: 'CRITICAL_EVENT',
    ABORT: 'TRIAL_ABORTED',
  },

  CRITICAL_EVENT: {
    COMMUNICATION_DISPLAYED: 'COMMUNICATION',
    ABORT: 'TRIAL_ABORTED',
  },

  COMMUNICATION: {
    COMMUNICATION_DISPLAYED: 'WAITING_FOR_ACTION',
    ABORT: 'TRIAL_ABORTED',
  },

  WAITING_FOR_ACTION: {
    PARTICIPANT_INTERVENTION: 'INTERVENTION',
    RESPONSE_TIMEOUT: 'OUTCOME',
    ABORT: 'TRIAL_ABORTED',
  },

  INTERVENTION: {
    OUTCOME_RECORDED: 'OUTCOME',
    ABORT: 'TRIAL_ABORTED',
  },

  OUTCOME: {
    SA_COMPLETE: 'SA_ASSESSMENT',
    ABORT: 'TRIAL_ABORTED',
  },

  SA_ASSESSMENT: {
    WORKLOAD_COMPLETE: 'WORKLOAD',
    ABORT: 'TRIAL_ABORTED',
  },

  WORKLOAD: {
    WORKLOAD_COMPLETE: 'TRIAL_COMPLETE',
    ABORT: 'TRIAL_ABORTED',
  },

  TRIAL_COMPLETE: {},

  TRIAL_ABORTED: {},
}

export class TrialStateMachine {
  private state: TrialState = 'INITIALISING'

  private readonly history: TransitionRecord[] = []

  getState(): TrialState {
    return this.state
  }

  getHistory(): TransitionRecord[] {
    return [...this.history]
  }

  canTransition(event: TransitionEvent): boolean {
    return transitions[this.state][event] !== undefined
  }

  transition(event: TransitionEvent, timestamp = performance.now()): TrialState {
    const nextState = transitions[this.state][event]

    if (!nextState) {
      throw new Error(
        `Invalid transition: ${this.state} --${event}--> ?`,
      )
    }

    const previousState = this.state

    this.state = nextState

    this.history.push({
      from: previousState,
      to: nextState,
      event,
      timestamp,
    })

    return this.state
  }

  isTerminal(): boolean {
    return (
      this.state === 'TRIAL_COMPLETE' ||
      this.state === 'TRIAL_ABORTED'
    )
  }

  reset(): void {
    this.state = 'INITIALISING'
    this.history.length = 0
  }
}
