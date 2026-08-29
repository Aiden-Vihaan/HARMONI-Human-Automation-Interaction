export type Condition =
  | 'STATE_ONLY'
  | 'STATE_AND_CONTEXT'
  | 'STATE_CONTEXT_AND_REASON'

export type TrialState =
  | 'INITIALISING'
  | 'AUTONOMOUS'
  | 'ENVIRONMENT_DEVELOPING'
  | 'CRITICAL_EVENT'
  | 'COMMUNICATION'
  | 'WAITING_FOR_ACTION'
  | 'INTERVENTION'
  | 'OUTCOME'
  | 'SA_ASSESSMENT'
  | 'WORKLOAD'
  | 'TRIAL_COMPLETE'
  | 'TRIAL_ABORTED'

export type SessionStatus =
  | 'ACTIVE'
  | 'COMPLETED'
  | 'ABORTED'
  | 'ERROR'

export type AutomationState =
  | 'AUTONOMOUS'
  | 'LIMITED'

export type ObstacleType =
  | 'STATIC'
  | 'MOVING'

export type ParticipantAction =
  | 'TAKE_CONTROL'
  | 'INVALID_ACTION'
  | 'TIMEOUT'

export type ResponseCategory =
  | 'CORRECT_INTERVENTION'
  | 'LATE_INTERVENTION'
  | 'NO_INTERVENTION'
  | 'INVALID_INTERVENTION'

export type AssessmentType =
  | 'SITUATION_AWARENESS'
  | 'WORKLOAD'
  | 'MANIPULATION_CHECK'

export type EventName =
  | 'SESSION_STARTED'
  | 'SESSION_COMPLETED'
  | 'SESSION_ABORTED'
  | 'TRIAL_STARTED'
  | 'TRIAL_COMPLETED'
  | 'TRIAL_ABORTED'
  | 'AUTOMATION_STARTED'
  | 'AUTOMATION_STATE_CHANGED'
  | 'AUTOMATION_LIMITED'
  | 'ENVIRONMENT_CHANGED'
  | 'OBSTACLE_APPEARED'
  | 'OBSTACLE_DETECTED'
  | 'CRITICAL_EVENT_TRIGGERED'
  | 'COMMUNICATION_DISPLAYED'
  | 'COMMUNICATION_DISMISSED'
  | 'PARTICIPANT_ACTION'
  | 'INTERVENTION_STARTED'
  | 'INTERVENTION_COMPLETED'
  | 'SA_STARTED'
  | 'SA_QUESTION_PRESENTED'
  | 'SA_RESPONSE_RECORDED'
  | 'SA_COMPLETED'
  | 'WORKLOAD_STARTED'
  | 'WORKLOAD_RESPONSE_RECORDED'
  | 'WORKLOAD_COMPLETED'
  | 'STATE_TRANSITION_ERROR'
  | 'LOGGING_ERROR'
  | 'RENDER_ERROR'
  | 'SESSION_ERROR'

export interface Participant {
  participantId: string
}

export interface Session {
  sessionId: string
  participantId: string
  startedAt: string
  completedAt?: string
  status: SessionStatus
}

export interface VehicleConfig {
  initialPosition: number
  speed: number
  automationState: AutomationState
}

export interface EnvironmentConfig {
  width: number
  height: number
  background: string
}

export interface ObstacleConfig {
  type: ObstacleType
  initialPosition: number
  triggerPosition: number
  trajectory?: number
}

export interface TimingConfig {
  baselineDuration: number
  developmentDuration: number
  criticalEventDelay: number
  responseWindow: number
  assessmentDelay: number
}

export interface ScenarioConfig {
  scenarioId: string
  version: string
  name: string
  vehicle: VehicleConfig
  environment: EnvironmentConfig
  obstacle: ObstacleConfig
  timing: TimingConfig
}

export interface Communication {
  condition: Condition
  stateMessage: string
  contextMessage?: string
  reasonMessage?: string
  actionLabel: string
}

export interface Trial {
  trialId: string
  sessionId: string
  scenarioId: string
  condition: Condition
  startedAt: string
  completedAt?: string
  state: TrialState
  terminationReason?: string
}

export interface Event<TMetadata = Record<string, unknown>> {
  eventId: string
  participantId: string
  sessionId: string
  trialId: string
  scenarioId: string
  condition: Condition
  eventName: EventName
  timestamp: string
  monotonicTimestamp?: number
  metadata?: TMetadata
}

export interface Assessment {
  assessmentId: string
  trialId: string
  type: AssessmentType
  startedAt: string
  completedAt?: string
}

export interface AssessmentResponse {
  assessmentId: string
  trialId: string
  questionId: string
  response: string | number
  timestamp: string
  responseTime?: number
  correct?: boolean
}

export interface TrialOutcome {
  trialId: string
  reactionTime?: number
  responseCategory: ResponseCategory
  decisionCorrect: boolean
  saScore?: number
  workloadScore?: number
}
