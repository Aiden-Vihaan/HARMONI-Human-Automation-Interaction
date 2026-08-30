import type {
  EnvironmentObject as EnvironmentObjectModel,
} from '../../types/environment'

interface EnvironmentObjectProps {
  object: EnvironmentObjectModel
}

export function EnvironmentObject({
  object,
}: EnvironmentObjectProps) {
  const style = {
    left: `${object.x}%`,
    top: `${object.y}%`,
    width: `${object.width}%`,
    height: `${object.height}%`,
  }

  switch (object.type) {
    case 'ROAD_BOUNDARY':
      return (
        <div
          className="environment-object road-boundary"
          style={style}
          aria-hidden="true"
        />
      )

    case 'LANE_MARKER':
      return (
        <div
          className="environment-object lane-marker"
          style={style}
          aria-hidden="true"
        />
      )

    case 'VEHICLE':
      return (
        <div
          className="environment-object vehicle"
          style={style}
          role="img"
          aria-label={
            object.label ?? 'Vehicle'
          }
        >
          <span className="vehicle-body" />
        </div>
      )

    case 'OBSTACLE':
      return (
        <div
          className="environment-object obstacle"
          style={style}
          role="img"
          aria-label={
            object.label ?? 'Obstacle'
          }
        >
          <span className="obstacle-label">
            OBSTACLE
          </span>
        </div>
      )

    case 'REFERENCE_OBJECT':
      return (
        <div
          className="environment-object reference-object"
          style={style}
          role="img"
          aria-label={
            object.label ??
            'Reference object'
          }
        />
      )

    default:
      return null
  }
}
