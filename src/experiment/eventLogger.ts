```ts
import type {
  Condition,
  EventName,
} from '../types/experiment'

export interface ExperimentEvent<TMetadata = Record<string, unknown>> {
  readonly eventId: string
  readonly sequenceNumber: number
  readonly participantId: string
  readonly sessionId: string
  readonly trialId: string
  readonly scenarioId: string
  readonly condition: Condition
  readonly eventName: EventName
  readonly timestamp: string
  readonly monotonicTimestamp: number
  readonly metadata?: TMetadata
}

export interface EventContext {
  participantId: string
  sessionId: string
  trialId: string
  scenarioId: string
  condition: Condition
}

export class EventLogger {
  private readonly events: ExperimentEvent[] = []

  private sequenceNumber = 0

  constructor(
    private readonly context: EventContext,
  ) {}

  log<TMetadata extends Record<string, unknown>>(
    eventName: EventName,
    metadata?: TMetadata,
  ): ExperimentEvent<TMetadata> {
    this.sequenceNumber += 1

    const event: ExperimentEvent<TMetadata> = {
      eventId: this.createEventId(),
      sequenceNumber: this.sequenceNumber,
      participantId: this.context.participantId,
      sessionId: this.context.sessionId,
      trialId: this.context.trialId,
      scenarioId: this.context.scenarioId,
      condition: this.context.condition,
      eventName,
      timestamp: new Date().toISOString(),
      monotonicTimestamp: performance.now(),
      metadata,
    }

    this.events.push(event as ExperimentEvent)

    return event
  }

  getAll(): readonly ExperimentEvent[] {
    return [...this.events]
  }

  getByTrial(trialId: string): ExperimentEvent[] {
    return this.events.filter(
      (event) => event.trialId === trialId,
    )
  }

  getByEventName(eventName: EventName): ExperimentEvent[] {
    return this.events.filter(
      (event) => event.eventName === eventName,
    )
  }

  getAfter(monotonicTimestamp: number): ExperimentEvent[] {
    return this.events.filter(
      (event) =>
        event.monotonicTimestamp > monotonicTimestamp,
    )
  }

  getBefore(monotonicTimestamp: number): ExperimentEvent[] {
    return this.events.filter(
      (event) =>
        event.monotonicTimestamp < monotonicTimestamp,
    )
  }

  count(): number {
    return this.events.length
  }

  clear(): void {
    this.events.length = 0
    this.sequenceNumber = 0
  }

  private createEventId(): string {
    return `EVT_${crypto.randomUUID()}`
  }
}
