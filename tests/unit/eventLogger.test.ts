import { beforeEach, describe, expect, it } from 'vitest'
import {
  EventLogger,
  type EventContext,
} from '../../src/experiment/eventLogger'

const context: EventContext = {
  participantId: 'P001',
  sessionId: 'S001',
  trialId: 'T001',
  scenarioId: 'SCN01',
  condition: 'STATE_AND_CONTEXT',
}

describe('EventLogger', () => {
  let logger: EventLogger

  beforeEach(() => {
    logger = new EventLogger(context)
  })

  it('starts with an empty event store', () => {
    expect(logger.count()).toBe(0)
    expect(logger.getAll()).toHaveLength(0)
  })

  it('records an event', () => {
    const event = logger.log('TRIAL_STARTED')

    expect(event.eventName).toBe('TRIAL_STARTED')
    expect(event.participantId).toBe('P001')
    expect(event.sessionId).toBe('S001')
    expect(event.trialId).toBe('T001')
    expect(event.scenarioId).toBe('SCN01')
    expect(event.condition).toBe('STATE_AND_CONTEXT')
  })

  it('assigns sequential sequence numbers', () => {
    const first = logger.log('TRIAL_STARTED')
    const second = logger.log('AUTOMATION_STARTED')
    const third = logger.log('OBSTACLE_APPEARED')

    expect(first.sequenceNumber).toBe(1)
    expect(second.sequenceNumber).toBe(2)
    expect(third.sequenceNumber).toBe(3)
  })

  it('generates unique event IDs', () => {
    const first = logger.log('TRIAL_STARTED')
    const second = logger.log('AUTOMATION_STARTED')

    expect(first.eventId).not.toBe(second.eventId)
  })

  it('records timestamps', () => {
    const event = logger.log('TRIAL_STARTED')

    expect(event.timestamp).toBeTruthy()
    expect(event.monotonicTimestamp).toEqual(
      expect.any(Number),
    )
  })

  it('stores metadata', () => {
    const event = logger.log(
      'PARTICIPANT_ACTION',
      {
        action: 'TAKE_CONTROL',
      },
    )

    expect(event.metadata).toEqual({
      action: 'TAKE_CONTROL',
    })
  })

  it('returns all events', () => {
    logger.log('TRIAL_STARTED')
    logger.log('AUTOMATION_STARTED')
    logger.log('OBSTACLE_APPEARED')

    expect(logger.getAll()).toHaveLength(3)
  })

  it('filters events by trial', () => {
    logger.log('TRIAL_STARTED')
    logger.log('OBSTACLE_APPEARED')

    const events = logger.getByTrial('T001')

    expect(events).toHaveLength(2)
  })

  it('filters events by event name', () => {
    logger.log('TRIAL_STARTED')
    logger.log('OBSTACLE_APPEARED')
    logger.log('OBSTACLE_APPEARED')

    const events = logger.getByEventName(
      'OBSTACLE_APPEARED',
    )

    expect(events).toHaveLength(2)
  })

  it('returns events after a timestamp', () => {
    const first = logger.log('TRIAL_STARTED')

    logger.log('AUTOMATION_STARTED')

    const events = logger.getAfter(
      first.monotonicTimestamp,
    )

    expect(events).toHaveLength(1)
    expect(events[0].eventName).toBe(
      'AUTOMATION_STARTED',
    )
  })

  it('returns events before a timestamp', () => {
    logger.log('TRIAL_STARTED')

    const second = logger.log('AUTOMATION_STARTED')

    const events = logger.getBefore(
      second.monotonicTimestamp,
    )

    expect(events).toHaveLength(1)
    expect(events[0].eventName).toBe(
      'TRIAL_STARTED',
    )
  })

  it('clears the event store', () => {
    logger.log('TRIAL_STARTED')
    logger.log('AUTOMATION_STARTED')

    logger.clear()

    expect(logger.count()).toBe(0)
    expect(logger.getAll()).toHaveLength(0)
  })

  it('does not expose the internal event array', () => {
    logger.log('TRIAL_STARTED')

    const events = logger.getAll()

    events.pop()

    expect(logger.count()).toBe(1)
  })
})
