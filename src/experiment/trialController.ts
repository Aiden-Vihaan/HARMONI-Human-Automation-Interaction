```ts
import {
  TrialStateMachine,
  type TransitionEvent,
} from './stateMachine'

import {
  EventLogger,
  type EventContext,
} from './eventLogger'

export interface TrialControllerOptions {
  context: EventContext
}

export class TrialController {
  private readonly stateMachine: TrialStateMachine

  private readonly logger: EventLogger

  constructor(options: TrialControllerOptions) {
    this.stateMachine = new TrialStateMachine()

    this.logger = new EventLogger(options.context)
  }

  getState() {
    return this.stateMachine.getState()
  }

  getEventStream() {
    return this.logger.getAll()
  }

  getTransitionHistory() {
    return this.stateMachine.getHistory()
  }

  canTransition(event: TransitionEvent): boolean {
    return this.stateMachine.canTransition(event)
  }

  dispatch(
    event: TransitionEvent,
    metadata: Record<string, unknown> = {},
  ) {
    const previousState = this.stateMachine.getState()

    try {
      const nextState = this.stateMachine.transition(event)

      this.logger.log(
        this.mapTransitionToEvent(event),
        {
          fromState: previousState,
          toState: nextState,
          transitionEvent: event,
          ...metadata,
        },
      )

      return nextState
    } catch (error) {
      this.logger.log('STATE_TRANSITION_ERROR', {
        fromState: previousState,
        transitionEvent: event,
        error:
          error instanceof Error
            ? error.message
            : 'Unknown transition error',
      })

      throw error
    }
  }

  private mapTransitionToEvent(
    event: TransitionEvent,
  ) {
    switch (event) {
      case 'START':
        return 'TRIAL_STARTED'

      case 'ENVIRONMENT_TRIGGER':
        return 'ENVIRONMENT_CHANGED'

      case 'CRITICAL_EVENT':
        return 'CRITICAL_EVENT_TRIGGERED'

      case 'COMMUNICATION_DISPLAYED':
        return 'COMMUNICATION_DISPLAYED'

      case 'PARTICIPANT_INTERVENTION':
        return 'PARTICIPANT_ACTION'

      case 'RESPONSE_TIMEOUT':
        return 'PARTICIPANT_ACTION'

      case 'OUTCOME_RECORDED':
        return 'INTERVENTION_COMPLETED'

      case 'SA_COMPLETE':
        return 'SA_COMPLETED'

      case 'WORKLOAD_COMPLETE':
        return 'TRIAL_COMPLETED'

      case 'ABORT':
        return 'TRIAL_ABORTED'
    }
  }
}
