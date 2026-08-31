import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createTrialController,
} from './TrialController'

import type {
  TrialState,
} from '../types/trial'

const initialState: TrialState = {
  trialId: 'test-trial',

  trialNumber: 1,

  phase: 'INTERVENTION',

  automationStatus:
    'REQUESTING_INTERVENTION',

  hazardLevel: 'MODERATE',

  environmentObjects: [],
}

describe(
  'TrialController',
  () => {
    it(
      'accepts TAKE_CONTROL during intervention',
      () => {
        const controller =
          createTrialController(
            initialState,
          )

        const event =
          controller.dispatch({
            type: 'TAKE_CONTROL',
          })

        expect(event).not.toBeNull()

        expect(
          controller
            .getState()
            .phase,
        ).toBe('COMPLETED')

        expect(
          controller
            .getState()
            .automationStatus,
        ).toBe('MANUAL')
      },
    )

    it(
      'rejects TAKE_CONTROL outside intervention',
      () => {
        const controller =
          createTrialController({
            ...initialState,
            phase: 'BASELINE',
          })

        const event =
          controller.dispatch({
            type: 'TAKE_CONTROL',
          })

        expect(event).toBeNull()

        expect(
          controller
            .getState()
            .phase,
        ).toBe('BASELINE')
      },
    )

    it(
      'does not accept actions after completion',
      () => {
        const controller =
          createTrialController({
            ...initialState,
            phase: 'COMPLETED',
            automationStatus:
              'MANUAL',
          })

        const event =
          controller.dispatch({
            type: 'TAKE_CONTROL',
          })

        expect(event).toBeNull()
      },
    )
  },
)
