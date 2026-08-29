import { describe, expect, it } from 'vitest'
import { FakeClock } from '../../src/experiment/clock'

describe('FakeClock', () => {
  it('starts at zero', () => {
    const clock = new FakeClock()

    expect(clock.now()).toBe(0)
  })

  it('advances deterministically', () => {
    const clock = new FakeClock()

    clock.advance(1000)

    expect(clock.now()).toBe(1000)

    clock.advance(500)

    expect(clock.now()).toBe(1500)
  })

  it('rejects negative advancement', () => {
    const clock = new FakeClock()

    expect(() => {
      clock.advance(-100)
    }).toThrow()
  })

  it('can be reset', () => {
    const clock = new FakeClock()

    clock.advance(5000)
    clock.reset()

    expect(clock.now()).toBe(0)
  })
})
