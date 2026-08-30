import {
  useState,
} from 'react'

import {
  ParticipantEnvironment,
} from './components/environment/ParticipantEnvironment'

import {
  initialEnvironment,
} from './data/environment/initialEnvironment'

function App() {
  const [
    environment,
    setEnvironment,
  ] = useState(
    initialEnvironment,
  )

  const [
    interventionAccepted,
    setInterventionAccepted,
  ] = useState(false)

  const handleTakeControl = () => {
    setInterventionAccepted(true)

    setEnvironment(
      (current) => ({
        ...current,
        automationStatus:
          'MANUAL',
      }),
    )
  }

  return (
    <ParticipantEnvironment
      environment={environment}
      canTakeControl={
        !interventionAccepted
      }
      onTakeControl={
        handleTakeControl
      }
    />
  )
}

export default App
