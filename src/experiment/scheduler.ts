import type { Clock } from './clock'

export interface ScheduledEvent<T = Record<string, unknown>> {
  readonly id: string
  readonly dueTime: number
  readonly priority: number
  readonly type: string
  readonly metadata?: T
}

export type ScheduledEventHandler = (
  event: ScheduledEvent,
) => void

export class ScenarioScheduler {
  private readonly events: ScheduledEvent[] = []

  constructor(
    private readonly clock: Clock,
    private readonly onEvent: ScheduledEventHandler,
  ) {}

  schedule<T = Record<string, unknown>>(
    event: Omit<ScheduledEvent<T>, 'id'>,
  ): string {
    const id = `SCH_${crypto.randomUUID()}`

    this.events.push({
      ...event,
      id,
    })

    this.sortEvents()

    return id
  }

  cancel(eventId: string): boolean {
    const index = this.events.findIndex(
      (event) => event.id === eventId,
    )

    if (index === -1) {
      return false
    }

    this.events.splice(index, 1)

    return true
  }

  tick(): void {
    const now = this.clock.now()

    const dueEvents = this.events.filter(
      (event) => event.dueTime <= now,
    )

    for (const event of dueEvents) {
      this.onEvent(event)
    }

    if (dueEvents.length > 0) {
      const dueIds = new Set(
        dueEvents.map((event) => event.id),
      )

      for (let index = this.events.length - 1; index >= 0; index -= 1) {
        if (dueIds.has(this.events[index].id)) {
          this.events.splice(index, 1)
        }
      }
    }
  }

  getPendingEvents(): readonly ScheduledEvent[] {
    return [...this.events]
  }

  clear(): void {
    this.events.length = 0
  }

  private sortEvents(): void {
    this.events.sort(
      (a, b) =>
        a.dueTime - b.dueTime ||
        a.priority - b.priority,
    )
  }
}
