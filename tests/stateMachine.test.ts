import { describe, expect, it } from 'vitest'
import { TrialStateMachine } from '../../src/experiment/stateMachine'

describe('TrialStateMachine', () => {
  it('starts in INITIALISING state', () => {
    const machine = new TrialStateMachine()

    expect(machine.getState()).toBe('INITIALISING')
  })

  it('allows a valid transition from INITIALISING to AUTONOMOUS', () => {
    const machine = new TrialStateMachine()

    machine.transition('START')

    expect(machine.getState()).toBe('AUTONOMOUS')
  })

  it('rejects invalid transitions', () => {
    const machine = new TrialStateMachine()

    expect(() => {
      machine.transition('WORKLOAD_COMPLETE')
    }).toThrow()
  })

  it('preserves the previous state after an invalid transition', () => {
    const machine = new TrialStateMachine()

    expect(() => {
      machine.transition('WORKLOAD_COMPLETE')
    }).toThrow()

    expect(machine.getState()).toBe('INITIALISING')
  })

  it('records transition history', () => {
    const machine = new TrialStateMachine()

    machine.transition('START', 100)
    machine.transition('ENVIRONMENT_TRIGGER', 200)

    const history = machine.getHistory()

    expect(history).toHaveLength(2)

    expect(history[0]).toEqual({
      from: 'INITIALISING',
      to: 'AUTONOMOUS',
      event: 'START',
      timestamp: 100,
    })

    expect(history[1]).toEqual({
      from: 'AUTONOMOUS',
      to: 'ENVIRONMENT_DEVELOPING',
      event: 'ENVIRONMENT_TRIGGER',
      timestamp: 200,
    })
  })

  it('identifies terminal states', () => {
    const machine = new TrialStateMachine()

    machine.transition('ABORT')

    expect(machine.isTerminal()).toBe(true)
    expect(machine.getState()).toBe('TRIAL_ABORTED')
  })

  it('does not allow transitions from a completed trial', () => {
    const machine = new TrialStateMachine()

    machine.transition('START')
    machine.transition('ENVIRONMENT_TRIGGER')
    machine.transition('CRITICAL_EVENT')
    machine.transition('COMMUNICATION_DISPLAYED')
    machine.transition('PARTICIPANT_INTERVENTION')
    machine.transition('OUTCOME_RECORDED')
    machine.transition('SA_COMPLETE')
    machine.transition('WORKLOAD_COMPLETE')
    machine.transition('WORKLOAD_COMPLETE')

    expect(machine.getState()).toBe('TRIAL_COMPLETE')

    expect(() => {
      machine.transition('START')
    }).toThrow()
  })

  it('can reset to the initial state', () => {
    const machine = new TrialStateMachine()

    machine.transition('START')

    machine.reset()

    expect(machine.getState()).toBe('INITIALISING')
    expect(machine.getHistory()).toHaveLength(0)
  })
})
