let eventCounter = 0

export function createEventId(): string {
  eventCounter += 1

  return `evt_${Date.now()}_${eventCounter}`
}
