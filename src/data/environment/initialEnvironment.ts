import type {
  EnvironmentState,
} from '../../types/environment'

export const initialEnvironment: EnvironmentState = {
  automationStatus: 'AUTONOMOUS',

  hazardLevel: 'NONE',

  objects: [
    {
      id: 'road-left',
      type: 'ROAD_BOUNDARY',
      x: 15,
      y: 0,
      width: 4,
      height: 100,
    },

    {
      id: 'road-right',
      type: 'ROAD_BOUNDARY',
      x: 81,
      y: 0,
      width: 4,
      height: 100,
    },

    {
      id: 'lane-marker-1',
      type: 'LANE_MARKER',
      x: 48,
      y: 10,
      width: 2,
      height: 12,
    },

    {
      id: 'lane-marker-2',
      type: 'LANE_MARKER',
      x: 48,
      y: 35,
      width: 2,
      height: 12,
    },

    {
      id: 'lane-marker-3',
      type: 'LANE_MARKER',
      x: 48,
      y: 60,
      width: 2,
      height: 12,
    },

    {
      id: 'vehicle-main',
      type: 'VEHICLE',
      x: 43,
      y: 72,
      width: 14,
      height: 18,
      state: 'PRIMARY',
      label: 'EGO VEHICLE',
    },

    {
      id: 'reference-vehicle',
      type: 'VEHICLE',
      x: 30,
      y: 32,
      width: 10,
      height: 14,
      state: 'MOVING',
      label: 'REFERENCE VEHICLE',
    },
  ],
}
