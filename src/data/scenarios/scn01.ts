import type { ScenarioConfig } from '../../types/experiment'

export const scenario01: ScenarioConfig = {
  scenarioId: 'SCN01',
  version: '1.0.0',
  name: 'Controlled Obstacle Intervention',

  vehicle: {
    initialPosition: 0,
    speed: 40,
    automationState: 'AUTONOMOUS',
  },

  environment: {
    width: 1200,
    height: 600,
    background: 'controlled-roadway',
  },

  obstacle: {
    type: 'STATIC',
    initialPosition: 0.8,
    triggerPosition: 0.4,
  },

  timing: {
    baselineDuration: 5000,
    developmentDuration: 5000,
    criticalEventDelay: 3000,
    responseWindow: 12000,
    assessmentDelay: 500,
  },
}
