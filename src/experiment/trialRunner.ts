```ts
import type {
  Condition,
  ScenarioConfig,
} from '../types/experiment'

import {
  ConditionEngine,
} from './conditionEngine'

import {
  ScenarioRunner,
} from './scenarioRunner'

import {
  RealClock,
  type Clock,
} from './clock'

import {
  TrialController,
} from './trialController'

export interface TrialRunnerOptions {
  participantId: string
  sessionId: string
  trialId: string
  scenario: ScenarioConfig
  condition: Condition
  clock?: Clock
}

export class TrialRunner {
  private readonly controller: TrialController

  private readonly scenarioRunner: ScenarioRunner

  private readonly conditionEngine: ConditionEngine

  constructor(
    options: TrialRunnerOptions,
  ) {
    const clock =
      options.clock ?? new RealClock()

    this.controller =
      new TrialController({
        context: {
          participantId:
            options.participantId,
          sessionId:
            options.sessionId,
          trialId: options.trialId,
          scenarioId:
            options.scenario.scenarioId,
          condition:
            options.condition,
        },
      })

    this.conditionEngine =
      new ConditionEngine()

    this.scenarioRunner =
      new ScenarioRunner(
        options.scenario,
        clock,
        this.controller,
      )
  }

  start(): void {
    this.scenarioRunner.start()
  }

  tick(): void {
    this.scenarioRunner.tick()
  }

  pause(): void {
    this.scenarioRunner.pause()
  }

  resume(): void {
    this.scenarioRunner.resume()
  }

  abort(): void {
    this.scenarioRunner.abort()
  }

  getState() {
    return this.controller.getState()
  }

  getStatus() {
    return this.scenarioRunner.getStatus()
  }

  getEvents() {
    return this.controller.getEventStream()
  }

  getTransitionHistory() {
    return this.controller.getTransitionHistory()
  }

  getCommunication() {
    const events =
      this.controller.getEventStream()

    const communicationEvent =
      [...events]
        .reverse()
        .find(
          (event) =>
            event.eventName ===
            'COMMUNICATION_DISPLAYED',
        )

    if (!communicationEvent) {
      return undefined
    }

    return this.conditionEngine.createCommunication(
      communicationEvent.condition,
    )
  }
}
