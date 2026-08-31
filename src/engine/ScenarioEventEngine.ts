import type {
  ScenarioDefinition,
  ScenarioEvent,
} from '../types/scenario'

export interface ScenarioEventEngine {
  getNextEventIndex(): number

  getElapsedTimeMs(): number

  processUntil(
    elapsedTimeMs: number,
  ): readonly ScenarioEvent[]
}

export function createScenarioEventEngine(
  scenario: ScenarioDefinition,
): ScenarioEventEngine {
  let nextEventIndex = 0
  let currentTimeMs = 0

  const sortedEvents = [
    ...scenario.events,
  ].sort(
    (a, b) =>
      a.triggerTimeMs -
      b.triggerTimeMs,
  )

  return {
    getNextEventIndex() {
      return nextEventIndex
    },

    getElapsedTimeMs() {
      return currentTimeMs
    },

    processUntil(
      elapsedTimeMs,
    ) {
      if (
        elapsedTimeMs <
        currentTimeMs
      ) {
        return []
      }

      currentTimeMs =
        Math.min(
          elapsedTimeMs,
          scenario.durationMs,
        )

      const processed: ScenarioEvent[] =
        []

      while (
        nextEventIndex <
          sortedEvents.length &&
        sortedEvents[
          nextEventIndex
        ].triggerTimeMs <=
          currentTimeMs
      ) {
        processed.push(
          sortedEvents[
            nextEventIndex
          ],
        )

        nextEventIndex += 1
      }

      return processed
    },
  }
}
