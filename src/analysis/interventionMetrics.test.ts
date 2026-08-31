import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  calculateInterventionMetrics,
} from './interventionMetrics'

describe(
  'calculateInterventionMetrics',
  () => {
    it(
      'calculates intervention latencies',
      () => {
        const metrics =
          calculateInterventionMetrics({
            interventionEpisodeId:
              'INT-001',

            communicationState:
              'COMPLETED',

            requestedAtMs:
              18000,

            presentedAtMs:
              18200,

            acknowledgedAtMs:
              20500,

            completedAtMs:
              23100,
          })

        expect(
          metrics.presentationLatencyMs,
        ).toBe(200)

        expect(
          metrics.acknowledgementLatencyMs,
        ).toBe(2300)

        expect(
          metrics.takeoverLatencyMs,
        ).toBe(4900)
      },
    )

    it(
      'returns null when an observation is unavailable',
      () => {
        const metrics =
          calculateInterventionMetrics({
            interventionEpisodeId:
              'INT-002',

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
          })

        expect(
          metrics.presentationLatencyMs,
        ).toBe(200)

        expect(
          metrics.acknowledgementLatencyMs,
        ).toBeNull()

        expect(
          metrics.takeoverLatencyMs,
        ).toBeNull()
      },
    )
  },
)
