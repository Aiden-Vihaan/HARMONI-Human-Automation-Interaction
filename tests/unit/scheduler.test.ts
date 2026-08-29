import { describe, expect, it } from 'vitest'

import {
  FakeClock,
} from '../../src/experiment/clock'

import {
  ScenarioScheduler,
} from '../../src/experiment/scheduler'

describe('ScenarioScheduler', () => {
  it('does not execute events before their due time', () => {
    const clock = new FakeClock()

    const received: string[] = []

    const scheduler = new ScenarioScheduler(
      clock,
      (event) => received.push(event.type),
    )

    scheduler.schedule({
      dueTime: 1000,
      priority: 1,
      type: 'TEST_EVENT',
    })

    scheduler.tick()

    expect(received).toEqual([])
  })

  it('executes an event when due', () => {
    const clock = new FakeClock()

    const received: string[] = []

    const scheduler = new ScenarioScheduler(
      clock,
      (event) => received.push(event.type),
    )

    scheduler.schedule({
      dueTime: 1000,
      priority: 1,
      type: 'TEST_EVENT',
    })

    clock.advance(1000)
    scheduler.tick()

    expect(received).toEqual([
      'TEST_EVENT',
    ])
  })

  it('executes events in chronological order', () => {
    const clock = new FakeClock()

    const received: string[] = []

    const scheduler = new ScenarioScheduler(
      clock,
      (event) => received.push(event.type),
    )

    scheduler.schedule({
      dueTime: 2000,
      priority: 1,
      type: 'SECOND',
    })

    scheduler.schedule({
      dueTime: 1000,
      priority: 1,
      type: 'FIRST',
    })

    clock.advance(2000)
    scheduler.tick()

    expect(received).toEqual([
      'FIRST',
      'SECOND',
    ])
  })

  it('uses priority when due times are identical', () => {
    const clock = new FakeClock()

    const received: string[] = []

    const scheduler = new ScenarioScheduler(
      clock,
      (event) => received.push(event.type),
    )

    scheduler.schedule({
      dueTime: 1000,
      priority: 20,
      type: 'LOW_PRIORITY',
    })

    scheduler.schedule({
      dueTime: 1000,
      priority: 10,
      type: 'HIGH_PRIORITY',
    })

    clock.advance(1000)
    scheduler.tick()

    expect(received).toEqual([
      'HIGH_PRIORITY',
      'LOW_PRIORITY',
    ])
  })

  it('can cancel a scheduled event', () => {
    const clock = new FakeClock()

    const received: string[] = []

    const scheduler = new ScenarioScheduler(
      clock,
      (event) => received.push(event.type),
    )

    const id = scheduler.schedule({
      dueTime: 1000,
      priority: 1,
      type: 'CANCELLED',
    })

    expect(
      scheduler.cancel(id),
    ).toBe(true)

    clock.advance(1000)
    scheduler.tick()

    expect(received).toEqual([])
  })

  it('removes executed events', () => {
    const clock = new FakeClock()

    const scheduler = new ScenarioScheduler(
      clock,
      () => undefined,
    )

    scheduler.schedule({
      dueTime: 1000,
      priority: 1,
      type: 'TEST_EVENT',
    })

    clock.advance(1000)
    scheduler.tick()

    expect(
      scheduler.getPendingEvents(),
    ).toHaveLength(0)
  })
})
