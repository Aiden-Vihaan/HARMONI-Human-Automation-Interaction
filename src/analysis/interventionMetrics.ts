import type {
  InterventionEpisode,
} from '../types/intervention'

export interface InterventionMetrics {
  readonly presentationLatencyMs:
    number | null

  readonly acknowledgementLatencyMs:
    number | null

  readonly takeoverLatencyMs:
    number | null
}

export function calculateInterventionMetrics(
  episode: InterventionEpisode,
): InterventionMetrics {
  const presentationLatencyMs =
    episode.requestedAtMs !== null &&
    episode.presentedAtMs !== null
      ? episode.presentedAtMs -
        episode.requestedAtMs
      : null

  const acknowledgementLatencyMs =
    episode.presentedAtMs !== null &&
    episode.acknowledgedAtMs !== null
      ? episode.acknowledgedAtMs -
        episode.presentedAtMs
      : null

  const takeoverLatencyMs =
    episode.presentedAtMs !== null &&
    episode.completedAtMs !== null
      ? episode.completedAtMs -
        episode.presentedAtMs
      : null

  return {
    presentationLatencyMs,
    acknowledgementLatencyMs,
    takeoverLatencyMs,
  }
}
