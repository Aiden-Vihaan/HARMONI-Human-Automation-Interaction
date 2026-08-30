import type {
  AutomationStatus as AutomationStatusType,
} from '../../types/environment'

interface AutomationStatusProps {
  status: AutomationStatusType
}

const statusLabels: Record<
  AutomationStatusType,
  string
> = {
  AUTONOMOUS: 'AUTONOMOUS',
  LIMITED: 'LIMITED',
  REQUESTING_INTERVENTION:
    'INTERVENTION REQUESTED',
  MANUAL: 'MANUAL CONTROL',
}

export function AutomationStatus({
  status,
}: AutomationStatusProps) {
  return (
    <section
      className={`automation-status automation-status--${status.toLowerCase()}`}
      aria-label="Automation status"
    >
      <span
        className="automation-status__indicator"
        aria-hidden="true"
      />

      <div>
        <span className="automation-status__label">
          AUTOMATION STATUS
        </span>

        <strong>
          {statusLabels[status]}
        </strong>
      </div>
    </section>
  )
}
