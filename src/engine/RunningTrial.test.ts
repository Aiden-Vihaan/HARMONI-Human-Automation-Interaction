import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createRunningTrial,
} from './RunningTrial'

import type {
  TrialState,
} from '../types/trial'

import type {
  ScenarioDefinition,
} from '../types/scenario'

const initialState:
  TrialState = {
  trialId:
    'integration-test',

  trialNumber: 1,

  phase:
    'BASELINE',

  automationStatus:
    'AUTONOMOUS',

  hazardLevel:
    'NONE',

  environmentObjects: [],
}

const scenario:
  ScenarioDefinition = {
  scenarioId:
    'integration-scenario',

  name:
    'Integration Scenario',

  durationMs:
    30000,

  events: [
    {
      eventId:
        'automation-limited',

      triggerTimeMs:
        10000,

      eventType:
        'AUTOMATION_STATUS_CHANGE',

      payload: {
        status:
          'LIMITED',
      },
    },

    {
      eventId:
        'hazard-moderate',

      triggerTimeMs:
        15000,

      eventType:
        'HAZARD_LEVEL_CHANGE',

      payload: {
        hazardLevel:
          'MODERATE',
      },
    },

    {
      eventId:
        'intervention-request',

      triggerTimeMs:
        18000,

      eventType:
        'INTERVENTION_REQUEST',
    },
  ],
}

describe(
  'RunningTrial',
  () => {
    it(
      'progresses through scheduled scenario events',
      () => {
        const trial =
          createRunningTrial(
            initialState,
            scenario,
          )

        trial.start()

        trial.update(
          1000,
        )

        expect(
          trial
            .getState()
            .phase,
        ).toBe('BASELINE')

        trial.update(
          11000,
        )

        expect(
          trial
            .getState()
            .automationStatus,
        ).toBe('LIMITED')

        trial.update(
          16000,
        )

        expect(
          trial
            .getState()
            .hazardLevel,
        ).toBe('MODERATE')

        trial.update(
          19000,
        )

        expect(
          trial
            .getState()
            .phase,
        ).toBe(
          'INTERVENTION',
        )

        expect(
          trial
            .getState()
            .automationStatus,
        ).toBe(
          'REQUESTING_INTERVENTION',
        )
      },
    )
  },
)
