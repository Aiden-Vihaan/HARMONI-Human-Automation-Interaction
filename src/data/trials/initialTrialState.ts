import type {
  TrialState,
} from '../../types/trial'

import {
  initialEnvironment,
} from '../environment/initialEnvironment'

export const initialTrialState:
  TrialState = {
  trialId:
    'trial-001',

  trialNumber: 1,

  phase:
    'BASELINE',

  automationStatus:
    'AUTONOMOUS',

  hazardLevel:
    'NONE',

  environmentObjects:
    initialEnvironment.objects,
}
