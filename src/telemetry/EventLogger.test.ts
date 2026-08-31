import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createEventLogger,
} from './EventLogger'

describe(
  'EventLogger',
  () => {
    it(
      'records events',
      () => {
        const logger =
          createEventLogger()

        const event =
          logger.log({
            eventType:
              'TRIAL_STARTED',

            trialId:
              'trial-001',

            timestampMs:
              0,

            source:
              'TRIAL_CONTROLLER',

            payload: {
              trialNumber:
                1,
            },
          })

        expect(
          event.trialId,
        ).toBe(
          'trial-001',
        )

        expect(
          event.eventType,
        ).toBe(
          'TRIAL_STARTED',
        )

        expect(
          event.sequenceNumber,
        ).toBe(1)
      },
    )

    it(
      'assigns increasing sequence numbers',
      () => {
        const logger =
          createEventLogger()

        const first =
          logger.log({
            eventType:
              'TRIAL_STARTED',

            trialId:
              'trial-001',

            timestampMs:
              0,

            source:
              'TRIAL_CONTROLLER',

            payload: {},
          })

        const second =
          logger.log({
            eventType:
              'SYSTEM_STATE_CHANGED',

            trialId:
              'trial-001',

            timestampMs:
              100,

            source:
              'TRIAL_CONTROLLER',

            payload: {},
          })

        expect(
          second.sequenceNumber,
        ).toBe(
          first.sequenceNumber +
            1,
        )
      },
    )

    it(
      'retrieves events by trial',
      () => {
        const logger =
          createEventLogger()

        logger.log({
          eventType:
            'TRIAL_STARTED',

          trialId:
            'trial-001',

          timestampMs:
            0,

          source:
            'TRIAL_CONTROLLER',

          payload: {},
        })

        logger.log({
          eventType:
            'TRIAL_STARTED',

          trialId:
            'trial-002',

          timestampMs:
            0,

          source:
            'TRIAL_CONTROLLER',

          payload: {},
        })

        const events =
          logger.getByTrial(
            'trial-001',
          )

        expect(
          events,
        ).toHaveLength(1)

        expect(
          events[0].trialId,
        ).toBe(
          'trial-001',
        )
      },
    )

    it(
      'returns a copy of the event collection',
      () => {
        const logger =
          createEventLogger()

        logger.log({
          eventType:
            'TRIAL_STARTED',

          trialId:
            'trial-001',

          timestampMs:
            0,

          source:
            'TRIAL_CONTROLLER',

          payload: {},
        })

        const events =
          logger.getAll()

        expect(
          events,
        ).toHaveLength(1)
      },
    )

    it(
      'clears events and sequence state',
      () => {
        const logger =
          createEventLogger()

        logger.log({
          eventType:
            'TRIAL_STARTED',

          trialId:
            'trial-001',

          timestampMs:
            0,

          source:
            'TRIAL_CONTROLLER',

          payload: {},
        })

        logger.clear()

        expect(
          logger.getAll(),
        ).toHaveLength(0)

        const event =
          logger.log({
            eventType:
              'TRIAL_STARTED',

            trialId:
              'trial-002',

            timestampMs:
              0,

            source:
              'TRIAL_CONTROLLER',

            payload: {},
          })

        expect(
          event.sequenceNumber,
        ).toBe(1)
      },
    )
  },
)
