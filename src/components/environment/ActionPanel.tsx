interface ActionPanelProps {
  enabled: boolean
  onTakeControl: () => void
}

export function ActionPanel({
  enabled,
  onTakeControl,
}: ActionPanelProps) {
  return (
    <section
      className="action-panel"
      aria-label="Participant actions"
    >
      <div>
        <span className="action-panel__eyebrow">
          PARTICIPANT ACTION
        </span>

        <h2>
          Manual intervention
        </h2>

        <p>
          Take control when the automated
          system can no longer safely manage
          the situation.
        </p>
      </div>

      <button
        type="button"
        className="take-control-button"
        disabled={!enabled}
        onClick={onTakeControl}
      >
        TAKE CONTROL
      </button>
    </section>
  )
}
