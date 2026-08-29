import { describe, expect, it } from 'vitest'

import {
  TrialController,
} from '../../src/experiment/trialController'

describe('Trial execution integration', () => {
  it('produces a reconstructable execution trace', () => {
    const controller = new TrialController({
      context: {
        participantId: 'P001',
        sessionId: 'S001',
        trialId: 'T001',
        scenarioId: 'SCN01',
        condition: 'STATE_CONTEXT_AND_REASON',
      },
    })

    controller.dispatch('START')

    controller.dispatch(
      'ENVIRONMENT_TRIGGER',
    )

    controller.dispatch('CRITICAL_EVENT')

    controller.dispatch(
      'COMMUNICATION_DISPLAYED',
    )

    controller.dispatch(
      'PARTICIPANT_INTERVENTION',
      {
        action: 'TAKE_CONTROL',
      },
    )

    controller.dispatch(
      'OUTCOME_RECORDED',
    )

    controller.dispatch('SA_COMPLETE')

    controller.dispatch(
      'WORKLOAD_COMPLETE',
    )

    const events =
      controller.getEventStream()

    expect(events).toHaveLength(8)

    expect(
      events.map(
        (event) => event.eventName,
      ),
    ).toEqual([
      'TRIAL_STARTED',
      'ENVIRONMENT_CHANGED',
      'CRITICAL_EVENT_TRIGGERED',
      'COMMUNICATION_DISPLAYED',
      'PARTICIPANT_ACTION',
      'INTERVENTION_COMPLETED',
      'SA_COMPLETED',
      'TRIAL_COMPLETED',
    ])

    expect(controller.getState()).toBe(
      'TRIAL_COMPLETE',
    )
  })
})
