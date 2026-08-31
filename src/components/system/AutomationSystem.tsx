interface AutomationStatusProps {
  readonly status: string
}

export function AutomationStatus({
  status,
}: AutomationStatusProps) {
  return (
    <section
      aria-labelledby="automation-status"
    >
      <p id="automation-status">
        Automation status
      </p>

      <strong>
        {status}
      </strong>
    </section>
  )
}
