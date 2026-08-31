import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createInterventionCommunication,
} from './InterventionCommunication'

describe(
  'InterventionCommunication',
  () => {
    it(
      'starts in the idle state',
      () => {
        const communication =
          createInterventionCommunication()

        expect(
          communication
            .getState()
            .communicationState,
        ).toBe('IDLE')
      },
    )

    it(
      'supports a complete intervention sequence',
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

        communication.acknowledge(
          20500,
        )

        communication.complete(
          23100,
        )

        const state =
          communication.getState()

        expect(
          state.communicationState,
        ).toBe('COMPLETED')

        expect(
          state.interventionEpisodeId,
        ).toBe('INT-001')

        expect(
          state.requestedAtMs,
        ).toBe(18000)

        expect(
          state.presentedAtMs,
        ).toBe(18200)

        expect(
          state.acknowledgedAtMs,
        ).toBe(20500)

        expect(
          state.completedAtMs,
        ).toBe(23100)
      },
    )

    it(
      'prevents acknowledgement before presentation',
      () => {
        const communication =
          createInterventionCommunication()

        communication.request(
          'INT-002',
          18000,
        )

        communication.acknowledge(
          19000,
        )

        expect(
          communication
            .getState()
            .communicationState,
        ).toBe('REQUESTED')
      },
    )

    it(
      'allows takeover directly after presentation',
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

        communication.complete(
          21000,
        )

        expect(
          communication
            .getState()
            .communicationState,
        ).toBe('COMPLETED')
      },
    )

    it(
      'rejects invalid backwards transitions',
      () => {
        const communication =
          createInterventionCommunication()

        communication.request(
          'INT-004',
          18000,
        )

        communication.present(
          18200,
        )

        communication.acknowledge(
          20000,
        )

        communication.request(
          'INT-005',
          21000,
        )

        expect(
          communication
            .getState()
            .interventionEpisodeId,
        ).toBe('INT-004')

        expect(
          communication
            .getState()
            .communicationState,
        ).toBe('ACKNOWLEDGED')
      },
    )

    it(
      'reports valid participant actions',
      () => {
        const communication =
          createInterventionCommunication()

        expect(
          communication.canPerformAction(
            'ACKNOWLEDGE_INTERVENTION',
          ),
        ).toBe(false)

        communication.request(
          'INT-005',
          18000,
        )

        communication.present(
          18200,
        )

        expect(
          communication.canPerformAction(
            'ACKNOWLEDGE_INTERVENTION',
          ),
        ).toBe(true)

        expect(
          communication.canPerformAction(
            'TAKE_CONTROL',
          ),
        ).toBe(true)
      },
    )
  },
)
