import type { ScenarioConfig } from '../types/experiment'
import type { TrialController } from './trialController'
import type { Clock } from './clock'
import {
  ScenarioScheduler,
  type ScheduledEvent,
} from './scheduler'

export type ScenarioStatus =
  | 'IDLE'
  | 'RUNNING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ABORTED'

export class ScenarioRunner {
  private readonly scheduler: ScenarioScheduler

  private status: ScenarioStatus = 'IDLE'

  private startTime = 0

  constructor(
    private readonly scenario: ScenarioConfig,
    private readonly clock: Clock,
    private readonly controller: TrialController,
  ) {
    this.scheduler = new ScenarioScheduler(
      clock,
      (event) => this.handleScheduledEvent(event),
    )
  }

  start(): void {
    if (this.status !== 'IDLE') {
      throw new Error(
        `Cannot start scenario from ${this.status}`,
      )
    }

    this.startTime = this.clock.now()

    this.controller.dispatch('START')

    this.status = 'RUNNING'

    this.scheduleScenario()
  }

  tick(): void {
    if (this.status !== 'RUNNING') {
      return
    }

    this.scheduler.tick()
  }

  pause(): void {
    if (this.status !== 'RUNNING') {
      throw new Error(
        `Cannot pause scenario from ${this.status}`,
      )
    }

    this.status = 'PAUSED'
  }

  resume(): void {
    if (this.status !== 'PAUSED') {
      throw new Error(
        `Cannot resume scenario from ${this.status}`,
      )
    }

    this.status = 'RUNNING'
  }

  abort(): void {
    if (
      this.status === 'COMPLETED' ||
      this.status === 'ABORTED'
    ) {
      return
    }

    this.controller.dispatch('ABORT')

    this.scheduler.clear()

    this.status = 'ABORTED'
  }

  getStatus(): ScenarioStatus {
    return this.status
  }

  getElapsedTime(): number {
    if (this.status === 'IDLE') {
      return 0
    }

    return this.clock.now() - this.startTime
  }

  private scheduleScenario(): void {
    const baselineEnd =
      this.scenario.timing.baselineDuration

    const environmentEnd =
      baselineEnd +
      this.scenario.timing.developmentDuration

    const criticalEventTime =
      environmentEnd +
      this.scenario.timing.criticalEventDelay

    this.scheduler.schedule({
      dueTime: baselineEnd,
      priority: 10,
      type: 'ENVIRONMENT_TRIGGER',
    })

    this.scheduler.schedule({
      dueTime: environmentEnd,
      priority: 10,
      type: 'CRITICAL_EVENT',
    })

    this.scheduler.schedule({
      dueTime: criticalEventTime,
      priority: 10,
      type: 'COMMUNICATION_DISPLAYED',
    })
  }

  private handleScheduledEvent(
    event: ScheduledEvent,
  ): void {
    if (this.status !== 'RUNNING') {
      return
    }

    switch (event.type) {
      case 'ENVIRONMENT_TRIGGER':
        this.controller.dispatch(
          'ENVIRONMENT_TRIGGER',
        )
        break

      case 'CRITICAL_EVENT':
        this.controller.dispatch(
          'CRITICAL_EVENT',
        )
        break

      case 'COMMUNICATION_DISPLAYED':
        this.controller.dispatch(
          'COMMUNICATION_DISPLAYED',
        )
        break

      default:
        throw new Error(
          `Unknown scheduled event: ${event.type}`,
        )
    }
  }
}
