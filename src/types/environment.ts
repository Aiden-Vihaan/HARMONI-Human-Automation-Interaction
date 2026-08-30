export type EnvironmentObjectType =
  | 'ROAD_BOUNDARY'
  | 'LANE_MARKER'
  | 'VEHICLE'
  | 'OBSTACLE'
  | 'REFERENCE_OBJECT'

export type AutomationStatus =
  | 'AUTONOMOUS'
  | 'LIMITED'
  | 'REQUESTING_INTERVENTION'
  | 'MANUAL'

export type HazardLevel =
  | 'NONE'
  | 'LOW'
  | 'MODERATE'
  | 'HIGH'

export interface EnvironmentObject {
  readonly id: string
  readonly type: EnvironmentObjectType
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly state?: string
  readonly label?: string
}

export interface EnvironmentState {
  readonly automationStatus: AutomationStatus
  readonly hazardLevel: HazardLevel
  readonly objects: readonly EnvironmentObject[]
}
