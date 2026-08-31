import type {
  ParticipantPresentationState,
} from '../../types/presentation'

interface InterventionRequestProps {
  readonly presentation:
    ParticipantPresentationState

  readonly onAcknowledge:
    () => void

  readonly onTakeControl:
    () => void
}

export function InterventionRequest({
  presentation,
  onAcknowledge,
  onTakeControl,
}: InterventionRequestProps) {
  if (
    presentation.intervention ===
    'HIDDEN'
  ) {
    return null
  }

  return (
    <section
      aria-labelledby="intervention-title"
    >
      <p>
        Intervention required
      </p>

      <h2 id="intervention-title">
        Participant intervention requested
      </h2>

      <p>
        {presentation.interventionMessage}
      </p>

      {presentation.canAcknowledge && (
        <button
          type="button"
          onClick={onAcknowledge}
        >
          Acknowledge
        </button>
      )}

      {presentation.canTakeControl && (
        <button
          type="button"
          onClick={onTakeControl}
        >
          Take control
        </button>
      )}
    </section>
  )
}
