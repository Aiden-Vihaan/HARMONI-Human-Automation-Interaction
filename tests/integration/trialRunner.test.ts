import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  FakeClock,
} from '../../src/experiment/clock'

import {
  TrialRunner,
} from '../../src/experiment/trialRunner'

import {
  scenario01,
} from '../../src/data/scenarios/scn01'

describe('TrialRunner', () => {
  it('starts a deterministic trial', () => {
    const clock = new FakeClock()

    const runner = new TrialRunner({
      participantId: 'P001',
      sessionId: 'S001',
      trialId: 'T001',
      scenario: scenario01,
      condition: 'STATE_ONLY',
      clock,
    })

    runner.start()

    expect(
      runner.getState(),
    ).toBe('AUTONOMOUS')

    expect(
      runner.getStatus(),
    ).toBe('RUNNING')
  })

  it('progresses through scenario timing deterministically', () => {
    const clock = new FakeClock()

    const runner = new TrialRunner({
      participantId: 'P001',
      sessionId: 'S001',
      trialId: 'T001',
      scenario: scenario01,
      condition: 'STATE_AND_CONTEXT',
      clock,
    })

    runner.start()

    expect(
      runner.getState(),
    ).toBe('AUTONOMOUS')

    clock.advance(
      scenario01.timing.baselineDuration,
    )

    runner.tick()

    expect(
      runner.getState(),
    ).toBe(
      'ENVIRONMENT_DEVELOPING',
    )

    clock.advance(
      scenario01.timing.developmentDuration,
    )

    runner.tick()

    expect(
      runner.getState(),
    ).toBe('CRITICAL_EVENT')
  })

  it('records the scenario execution trace', () => {
    const clock = new FakeClock()

    const runner = new TrialRunner({
      participantId: 'P001',
      sessionId: 'S001',
      trialId: 'T001',
      scenario: scenario01,
      condition:
        'STATE_CONTEXT_AND_REASON',
      clock,
    })

    runner.start()

    clock.advance(5000)
    runner.tick()

    clock.advance(5000)
    runner.tick()

    clock.advance(3000)
    runner.tick()

    const events =
      runner.getEvents()

    expect(
      events.map(
        (event) => event.eventName,
      ),
    ).toEqual([
      'TRIAL_STARTED',
      'ENVIRONMENT_CHANGED',
      'CRITICAL_EVENT_TRIGGERED',
      'COMMUNICATION_DISPLAYED',
    ])
  })

  it('generates condition-specific communication', () => {
    const clock = new FakeClock()

    const runner = new TrialRunner({
      participantId: 'P001',
      sessionId: 'S001',
      trialId: 'T001',
      scenario: scenario01,
      condition: 'STATE_ONLY',
      clock,
    })

    runner.start()

    clock.advance(13000)
    runner.tick()

    const communication =
      runner.getCommunication()

    expect(
      communication?.stateMessage,
    ).toBe('AUTOMATION LIMITED')

    expect(
      communication?.contextMessage,
    ).toBeUndefined()

    expect(
      communication?.reasonMessage,
    ).toBeUndefined()
  })

  it('can abort a running trial', () => {
    const clock = new FakeClock()

    const runner = new TrialRunner({
      participantId: 'P001',
      sessionId: 'S001',
      trialId: 'T001',
      scenario: scenario01,
      condition: 'STATE_ONLY',
      clock,
    })

    runner.start()

    runner.abort()

    expect(
      runner.getState(),
    ).toBe('TRIAL_ABORTED')

    expect(
      runner.getStatus(),
    ).toBe('ABORTED')
  })

  it('does not progress while paused', () => {
    const clock = new FakeClock()

    const runner = new TrialRunner({
      participantId: 'P001',
      sessionId: 'S001',
      trialId: 'T001',
      scenario: scenario01,
      condition: 'STATE_AND_CONTEXT',
      clock,
    })

    runner.start()

    runner.pause()

    clock.advance(20000)

    runner.tick()

    expect(
      runner.getState(),
    ).toBe('AUTONOMOUS')
  })
})
