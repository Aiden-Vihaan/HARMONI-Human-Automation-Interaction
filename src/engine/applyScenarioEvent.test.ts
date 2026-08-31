import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  applyScenarioEvent,
} from './applyScenarioEvent'

import type {
  TrialState,
} from '../types/trial'

const state: TrialState = {
  trialId: 'test-trial',

  trialNumber: 1,

  phase: 'BASELINE',

  automationStatus:
    'AUTONOMOUS',

  hazardLevel: 'NONE',

  environmentObjects: [],
}

describe(
  'applyScenarioEvent',
  () => {
    it(
      'changes automation status',
      () => {
        const result =
          applyScenarioEvent(
            state,
            {
              eventId: 'event-1',
              triggerTimeMs: 10000,
              eventType:
                'AUTOMATION_STATUS_CHANGE',
              payload: {
                status: 'LIMITED',
              },
            },
          )

        expect(
          result.automationStatus,
        ).toBe('LIMITED')
      },
    )

    it(
      'changes hazard level',
      () => {
        const result =
          applyScenarioEvent(
            state,
            {
              eventId: 'event-2',
              triggerTimeMs: 15000,
              eventType:
                'HAZARD_LEVEL_CHANGE',
              payload: {
                hazardLevel:
                  'MODERATE',
              },
            },
          )

        expect(
          result.hazardLevel,
        ).toBe('MODERATE')
      },
    )

    it(
      'requests intervention',
      () => {
        const result =
          applyScenarioEvent(
            state,
            {
              eventId: 'event-3',
              triggerTimeMs: 18000,
              eventType:
                'INTERVENTION_REQUEST',
            },
          )

        expect(
          result.phase,
        ).toBe('INTERVENTION')

        expect(
          result.automationStatus,
        ).toBe(
          'REQUESTING_INTERVENTION',
        )
      },
    )
  },
)
