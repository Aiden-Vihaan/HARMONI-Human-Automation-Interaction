import type {
  EnvironmentState,
} from '../../types/environment'

import {
  EnvironmentObject,
} from './EnvironmentObject'

interface EnvironmentCanvasProps {
  environment: EnvironmentState
}

export function EnvironmentCanvas({
  environment,
}: EnvironmentCanvasProps) {
  return (
    <section
      className="environment-canvas"
      aria-label="Operational environment"
    >
      <div
        className="environment-canvas__sky"
        aria-hidden="true"
      />

      <div
        className="environment-canvas__road"
        aria-hidden="true"
      />

      <div
        className="environment-canvas__objects"
      >
        {environment.objects.map(
          (object) => (
            <EnvironmentObject
              key={object.id}
              object={object}
            />
          ),
        )}
      </div>

      <div
        className="environment-canvas__overlay"
        aria-hidden="true"
      />

      <span className="sr-only">
        Current automation status:{' '}
        {environment.automationStatus}.
        Current hazard level:{' '}
        {environment.hazardLevel}.
      </span>
    </section>
  )
}
