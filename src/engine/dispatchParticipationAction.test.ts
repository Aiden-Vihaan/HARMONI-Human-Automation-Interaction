import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createInterventionCommunication,
} from './InterventionCommunication'

import {
  dispatchParticipantAction,
} from './dispatchParticipantAction'

describe(
  'dispatchParticipantAction',
  () => {
    it(
      'rejects acknowledgement before presentation',
      () => {
        const communication =
          createInterventionCommunication()

        const accepted =
          dispatchParticipantAction(
            communication,
            {
              type:
                'ACKNOWLEDGE_INTERVENTION',

              timestampMs:
                1000,
            },
          )

        expect(
          accepted,
        ).toBe(false)

        expect(
          communication
            .getState()
            .communicationState,
        ).toBe('IDLE')
      },
    )

    it(
      'accepts acknowledgement after presentation',
      () => {
        const communication =
          createInterventionCommunication()

        communication.request(
          'INT-001',
          18000,
        )

        communication.present(
          18200,
        )

        const accepted =
          dispatchParticipantAction(
            communication,
            {
              type:
                'ACKNOWLEDGE_INTERVENTION',

              timestampMs:
                20500,
            },
          )

        expect(
          accepted,
        ).toBe(true)

        expect(
          communication
            .getState()
            .communicationState,
        ).toBe(
          'ACKNOWLEDGED',
        )
      },
    )

    it(
      'accepts takeover during intervention',
      () => {
        const communication =
          createInterventionCommunication()

        communication.request(
          'INT-002',
          18000,
        )

        communication.present(
          18200,
        )

        const accepted =
          dispatchParticipantAction(
            communication,
            {
              type:
                'TAKE_CONTROL',

              timestampMs:
                22000,
            },
          )

        expect(
          accepted,
        ).toBe(true)

        expect(
          communication
            .getState()
            .communicationState,
        ).toBe(
          'COMPLETED',
        )
      },
    )

    it(
      'prevents duplicate takeover',
      () => {
        const communication =
          createInterventionCommunication()

        communication.request(
          'INT-003',
          18000,
        )

        communication.present(
          18200,
        )

        const first =
          dispatchParticipantAction(
            communication,
            {
              type:
                'TAKE_CONTROL',

              timestampMs:
                22000,
            },
          )

        const second =
          dispatchParticipantAction(
            communication,
            {
              type:
                'TAKE_CONTROL',

              timestampMs:
                23000,
            },
          )

        expect(
          first,
        ).toBe(true)

        expect(
          second,
        ).toBe(false)
      },
    )
  },
)
