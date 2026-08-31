import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createEventLogger,
} from './EventLogger'

import {
  logRejectedAction,
} from './logRejectedAction'

describe(
  'logRejectedAction',
  () => {
    it(
      'records rejected participant actions',
      () => {
        const logger =
          createEventLogger()

        const event =
          logRejectedAction(
            logger,
            'trial-001',
            12000,
            {
              action:
                'TAKE_CONTROL',

              reason:
                'INTERVENTION_NOT_PRESENTED',
            },
          )

        expect(
          event.eventType,
        ).toBe(
          'PARTICIPANT_ACTION_REJECTED',
        )

        expect(
          event.payload,
        ).toEqual({
          action:
            'TAKE_CONTROL',

          reason:
            'INTERVENTION_NOT_PRESENTED',
        })
      },
    )
  },
)
