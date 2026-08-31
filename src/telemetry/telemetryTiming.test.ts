import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  createEventLogger,
} from './EventLogger'

import {
  logInterventionRequested,
  logInterventionPresented,
} from './interventionTelemetry'

describe(
  'telemetry timing',
  () => {
    it(
      'preserves raw timestamps required for later latency analysis',
      () => {
        const logger =
          createEventLogger()

        const context = {
          trialId:
            'trial-001',

          interventionEpisodeId:
            'INT-001',
        }

        logInterventionRequested(
          logger,
          context,
          18000,
        )

        logInterventionPresented(
          logger,
          context,
          18200,
        )

        const events =
          logger.getByTrial(
            'trial-001',
          )

        expect(
          events[0].timestampMs,
        ).toBe(18000)

        expect(
          events[1].timestampMs,
        ).toBe(18200)

        const derivedLatency =
          events[1].timestampMs -
          events[0].timestampMs

        expect(
          derivedLatency,
        ).toBe(200)
      },
    )
  },
)
