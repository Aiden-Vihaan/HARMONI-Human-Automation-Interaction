import type {
  AutomationState,
  Condition,
  ScenarioConfig,
  TrialState,
} from './experiment'

export interface ScenarioRuntime {
  scenario: ScenarioConfig
  currentState: TrialState
  automationState: AutomationState
  condition: Condition
  elapsedTime: number
}

export interface ScenarioEvent {
  type:
    | 'START'
    | 'ENVIRONMENT_TRIGGER'
    | 'CRITICAL_EVENT'
    | 'COMMUNICATION'
    | 'PARTICIPANT_ACTION'
    | 'TIMEOUT'
    | 'SA_COMPLETE'
    | 'WORKLOAD_COMPLETE'
    | 'ABORT'

  timestamp: number
}

export interface ScenarioResult {
  completed: boolean
  responseCategory?: string
  reactionTime?: number
  terminationReason?: string
}
