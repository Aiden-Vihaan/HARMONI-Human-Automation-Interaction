import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  ConditionEngine,
} from '../../src/experiment/conditionEngine'

describe('ConditionEngine', () => {
  const engine = new ConditionEngine()

  it('generates state-only communication', () => {
    const communication =
      engine.createCommunication(
        'STATE_ONLY',
      )

    expect(
      communication.stateMessage,
    ).toBe('AUTOMATION LIMITED')

    expect(
      communication.contextMessage,
    ).toBeUndefined()

    expect(
      communication.reasonMessage,
    ).toBeUndefined()
  })

  it('generates state and context communication', () => {
    const communication =
      engine.createCommunication(
        'STATE_AND_CONTEXT',
      )

    expect(
      communication.stateMessage,
    ).toBe('AUTOMATION LIMITED')

    expect(
      communication.contextMessage,
    ).toBe(
      'OBSTACLE DETECTED AHEAD',
    )

    expect(
      communication.reasonMessage,
    ).toBeUndefined()
  })

  it('generates complete communication', () => {
    const communication =
      engine.createCommunication(
        'STATE_CONTEXT_AND_REASON',
      )

    expect(
      communication.stateMessage,
    ).toBe('AUTOMATION LIMITED')

    expect(
      communication.contextMessage,
    ).toBe(
      'OBSTACLE DETECTED AHEAD',
    )

    expect(
      communication.reasonMessage,
    ).toBe(
      'AUTOMATED CONTROL IS CURRENTLY UNABLE TO MANAGE THIS SITUATION',
    )
  })

  it('keeps the experimental condition in the payload', () => {
    const communication =
      engine.createCommunication(
        'STATE_AND_CONTEXT',
      )

    expect(
      communication.condition,
    ).toBe(
      'STATE_AND_CONTEXT',
    )
  })

  it('provides a communication version', () => {
    expect(
      engine.getVersion(),
    ).toBe('1.0.0')
  })

  it('includes an action label', () => {
    const communication =
      engine.createCommunication(
        'STATE_ONLY',
      )

    expect(
      communication.actionLabel,
    ).toBe('TAKE CONTROL')
  })
})
