import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createEventLogger,
} from './EventLogger'

import {
  logTrialStarted,
  logTrialCompleted,
} from './trialTelemetry'

import {
  logInterventionRequested,
  logInterventionPresented,
  logInterventionAcknowledged,
  logInterventionCompleted,
} from './interventionTelemetry'

import {
  logParticipantAction,
} from './participantTelemetry'

describe(
  'Day 31 telemetry integration',
  () => {
    it(
      'produces a complete intervention trial trace',
      () => {
        const logger =
          createEventLogger()

        const trialId =
          'trial-001'

        const interventionEpisodeId =
          'INT-001'

        logTrialStarted(
          logger,
          {
            trialId,
            conditionId:
              'CONDITION-A',
          },
          0,
        )

        logInterventionRequested(
          logger,
          {
            trialId,
            interventionEpisodeId,
          },
          18000,
        )

        logInterventionPresented(
          logger,
          {
            trialId,
            interventionEpisodeId,
          },
          18200,
        )

        logParticipantAction(
          logger,
          {
            trialId,
          },
          20500,
          'ACKNOWLEDGE_INTERVENTION',
        )

        logInterventionAcknowledged(
          logger,
          {
            trialId,
            interventionEpisodeId,
          },
          20500,
        )

        logParticipantAction(
          logger,
          {
            trialId,
          },
          23100,
          'TAKE_CONTROL',
        )

        logInterventionCompleted(
          logger,
          {
            trialId,
            interventionEpisodeId,
          },
          23100,
        )

        logTrialCompleted(
          logger,
          {
            trialId,
            conditionId:
              'CONDITION-A',
          },
          25000,
        )

        const events =
          logger.getByTrial(
            trialId,
          )

        expect(
          events,
        ).toHaveLength(8)

        expect(
          events.map(
            event =>
              event.eventType,
          ),
        ).toEqual([
          'TRIAL_STARTED',
          'INTERVENTION_REQUESTED',
          'INTERVENTION_PRESENTED',
          'PARTICIPANT_ACTION',
          'INTERVENTION_ACKNOWLEDGED',
          'PARTICIPANT_ACTION',
          'INTERVENTION_COMPLETED',
          'TRIAL_COMPLETED',
        ])
      },
    )
  },
)
