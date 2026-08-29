```ts
import type {
  Communication,
  Condition,
} from '../types/experiment'

interface ConditionDefinition {
  readonly condition: Condition
  readonly includeState: boolean
  readonly includeContext: boolean
  readonly includeReason: boolean
}

const CONDITION_DEFINITIONS: Record<
  Condition,
  ConditionDefinition
> = {
  STATE_ONLY: {
    condition: 'STATE_ONLY',
    includeState: true,
    includeContext: false,
    includeReason: false,
  },

  STATE_AND_CONTEXT: {
    condition: 'STATE_AND_CONTEXT',
    includeState: true,
    includeContext: true,
    includeReason: false,
  },

  STATE_CONTEXT_AND_REASON: {
    condition: 'STATE_CONTEXT_AND_REASON',
    includeState: true,
    includeContext: true,
    includeReason: true,
  },
}

const CONTENT = {
  version: '1.0.0',

  state:
    'AUTOMATION LIMITED',

  context:
    'OBSTACLE DETECTED AHEAD',

  reason:
    'AUTOMATED CONTROL IS CURRENTLY UNABLE TO MANAGE THIS SITUATION',

  actionLabel:
    'TAKE CONTROL',
} as const

export class ConditionEngine {
  createCommunication(
    condition: Condition,
  ): Communication {
    const definition =
      CONDITION_DEFINITIONS[condition]

    if (!definition) {
      throw new Error(
        `Unsupported experimental condition: ${condition}`,
      )
    }

    const communication: Communication = {
      condition,
      stateMessage: definition.includeState
        ? CONTENT.state
        : '',
      contextMessage:
        definition.includeContext
          ? CONTENT.context
          : undefined,
      reasonMessage:
        definition.includeReason
          ? CONTENT.reason
          : undefined,
      actionLabel: CONTENT.actionLabel,
    }

    this.validate(communication)

    return communication
  }

  getVersion(): string {
    return CONTENT.version
  }

  private validate(
    communication: Communication,
  ): void {
    if (
      communication.condition ===
        'STATE_ONLY' &&
      (communication.contextMessage ||
        communication.reasonMessage)
    ) {
      throw new Error(
        'STATE_ONLY cannot contain contextual or reason information.',
      )
    }

    if (
      communication.condition ===
        'STATE_AND_CONTEXT' &&
      communication.reasonMessage
    ) {
      throw new Error(
        'STATE_AND_CONTEXT cannot contain reason information.',
      )
    }

    if (!communication.stateMessage) {
      throw new Error(
        'Every communication must contain state information.',
      )
    }

    if (!communication.actionLabel) {
      throw new Error(
        'Every communication must contain an action label.',
      )
    }
  }
}
