import type {
  ScenarioDefinition,
} from '../../types/scenario'

export const baselineInterventionScenario:
  ScenarioDefinition = {
    scenarioId:
      'scenario-baseline-intervention-001',

    name:
      'Controlled Automation Intervention',

    durationMs: 30000,

    events: [
      {
        eventId: 'event-001',
        triggerTimeMs: 10000,
        eventType:
          'AUTOMATION_STATUS_CHANGE',
        payload: {
          status: 'LIMITED',
        },
      },

      {
        eventId: 'event-002',
        triggerTimeMs: 15000,
        eventType:
          'HAZARD_LEVEL_CHANGE',
        payload: {
          hazardLevel: 'MODERATE',
        },
      },

      {
        eventId: 'event-003',
        triggerTimeMs: 18000,
        eventType:
          'INTERVENTION_REQUEST',
      },
    ],
  }
