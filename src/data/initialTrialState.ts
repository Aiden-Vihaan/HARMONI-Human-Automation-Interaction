import type {
  TrialState,
} from '../../types/trial'

import {
  initialEnvironment,
} from '../environment/initialEnvironment'

export const initialTrialState: TrialState = {
  trialId: 'trial-001',

  trialNumber: 1,

  phase: 'INTERVENTION',

  automationStatus:
    'REQUESTING_INTERVENTION',

  hazardLevel: 'MODERATE',

  environmentObjects:
    initialEnvironment.objects,
}
