import { describe, expect, it } from 'vitest'

import {
  TrialController,
} from '../../src/experiment/trialController'

const createController = () =>
  new TrialController({
    context: {
      participantId: 'P001',
      sessionId: 'S001',
      trialId: 'T001',
      scenarioId: 'SCN01',
      condition: 'STATE_AND_CONTEXT',
    },
  })

describe('TrialController', () => {
  it('starts in INITIALISING', () => {
    const controller = createController()

    expect(controller.getState()).toBe(
      'INITIALISING',
    )
  })

  it('changes state through dispatch', () => {
    const controller = createController()

    controller.dispatch('START')

    expect(controller.getState()).toBe(
      'AUTONOMOUS',
    )
  })

  it('creates an event after a successful transition', () => {
    const controller = createController()

    controller.dispatch('START')

    const events = controller.getEventStream()

    expect(events).toHaveLength(1)

    expect(events[0].eventName).toBe(
      'TRIAL_STARTED',
    )
  })

  it('stores transition metadata', () => {
    const controller = createController()

    controller.dispatch('START')

    const event = controller.getEventStream()[0]

    expect(event.metadata).toMatchObject({
      fromState: 'INITIALISING',
      toState: 'AUTONOMOUS',
      transitionEvent: 'START',
    })
  })

  it('preserves event ordering', () => {
    const controller = createController()

    controller.dispatch('START')
    controller.dispatch(
      'ENVIRONMENT_TRIGGER',
    )
    controller.dispatch('CRITICAL_EVENT')

    const events = controller.getEventStream()

    expect(events).toHaveLength(3)

    expect(events[0].sequenceNumber).toBe(1)
    expect(events[1].sequenceNumber).toBe(2)
    expect(events[2].sequenceNumber).toBe(3)
  })

  it('records an error event for invalid transitions', () => {
    const controller = createController()

    expect(() => {
      controller.dispatch(
        'WORKLOAD_COMPLETE',
      )
    }).toThrow()

    const events = controller.getEventStream()

    expect(events).toHaveLength(1)

    expect(events[0].eventName).toBe(
      'STATE_TRANSITION_ERROR',
    )
  })

  it('does not change state after an invalid transition', () => {
    const controller = createController()

    expect(() => {
      controller.dispatch(
        'WORKLOAD_COMPLETE',
      )
    }).toThrow()

    expect(controller.getState()).toBe(
      'INITIALISING',
    )
  })

  it('supports aborting an active trial', () => {
    const controller = createController()

    controller.dispatch('START')
    controller.dispatch('ABORT')

    expect(controller.getState()).toBe(
      'TRIAL_ABORTED',
    )

    const events = controller.getEventStream()

    expect(events[1].eventName).toBe(
      'TRIAL_ABORTED',
    )
  })
})
