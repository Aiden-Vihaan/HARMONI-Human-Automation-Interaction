import type {
  EnvironmentState,
} from '../../types/environment'

import {
  EnvironmentCanvas,
} from './EnvironmentCanvas'

import {
  AutomationStatus,
} from './AutomationStatus'

import {
  ActionPanel,
} from './ActionPanel'

interface ParticipantEnvironmentProps {
  environment: EnvironmentState
  canTakeControl: boolean
  onTakeControl: () => void
}

export function ParticipantEnvironment({
  environment,
  canTakeControl,
  onTakeControl,
}: ParticipantEnvironmentProps) {
  return (
    <main className="participant-environment">
      <header className="participant-header">
        <div>
          <span className="participant-header__eyebrow">
            HARMONI / OPERATIONAL SESSION
          </span>

          <h1>
            Automated Environment
          </h1>
        </div>

        <AutomationStatus
          status={
            environment.automationStatus
          }
        />
      </header>

      <EnvironmentCanvas
        environment={environment}
      />

      <ActionPanel
        enabled={canTakeControl}
        onTakeControl={onTakeControl}
      />
    </main>
  )
}
