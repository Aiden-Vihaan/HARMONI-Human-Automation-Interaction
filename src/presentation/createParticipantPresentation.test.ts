import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createParticipantPresentation,
} from './createParticipantPresentation'

const trialState = {
  trialId:
    'trial-001',

  trialNumber:
    1,

  phase:
    'INTERVENTION',

  automationStatus:
    'REQUESTING_INTERVENTION',

  hazardLevel:
    'MODERATE',

  environmentObjects: [],
} as const

describe(
  'createParticipantPresentation',
  () => {
    it(
      'hides intervention when idle',
      () => {
        const result =
          createParticipantPresentation(
            trialState,
            {
              interventionEpisodeId:
                '',
              communicationState:
                'IDLE',
              requestedAtMs:
                null,
              presentedAtMs:
                null,
              acknowledgedAtMs:
                null,
              completedAtMs:
                null,
            },
          )

        expect(
          result.intervention,
        ).toBe('HIDDEN')

        expect(
          result.canTakeControl,
        ).toBe(false)
      },
    )

    it(
      'shows intervention after presentation',
      () => {
        const result =
          createParticipantPresentation(
            trialState,
            {
              interventionEpisodeId:
                'INT-001',
              communicationState:
                'PRESENTED',
              requestedAtMs:
                18000,
              presentedAtMs:
                18200,
              acknowledgedAtMs:
                null,
              completedAtMs:
                null,
            },
          )

        expect(
          result.intervention,
        ).toBe('VISIBLE')

        expect(
          result.canAcknowledge,
        ).toBe(true)

        expect(
          result.canTakeControl,
        ).toBe(true)
      },
    )

    it(
      'keeps takeover available after acknowledgement',
      () => {
        const result =
          createParticipantPresentation(
            trialState,
            {
              interventionEpisodeId:
                'INT-002',
              communicationState:
                'ACKNOWLEDGED',
              requestedAtMs:
                18000,
              presentedAtMs:
                18200,
              acknowledgedAtMs:
                20000,
              completedAtMs:
                null,
            },
          )

        expect(
          result.intervention,
        ).toBe('VISIBLE')

        expect(
          result.canAcknowledge,
        ).toBe(false)

        expect(
          result.canTakeControl,
        ).toBe(true)
      },
    )
  },
)
