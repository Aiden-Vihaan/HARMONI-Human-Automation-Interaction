import type {
  ParticipantConditionSummary,
} from './participantConditionTypes'

import type {
  ParticipantComparison,
} from './comparisonTypes'

export function compareParticipantConditions(
  participantId: string,
  conditionA: ParticipantConditionSummary | undefined,
  conditionB: ParticipantConditionSummary | undefined,
  metric: keyof ParticipantConditionSummary['takeoverLatency'],
): ParticipantComparison {
  const valueA =
    conditionA?.takeoverLatency.mean ??
    null

  const valueB =
    conditionB?.takeoverLatency.mean ??
    null

  if (
    valueA === null ||
    valueB === null
  ) {
    return {
      participantId,
      conditionA:
        conditionA?.conditionId ??
        'UNKNOWN',
      conditionB:
        conditionB?.conditionId ??
        'UNKNOWN',
      metric,
      conditionAValue:
        valueA,
      conditionBValue:
        valueB,
      difference:
        null,
      absoluteDifference:
        null,
      valid:
        false,
    }
  }

  const difference =
    valueB - valueA

  return {
    participantId,
    conditionA:
      conditionA.conditionId,
    conditionB:
      conditionB.conditionId,
    metric,
    conditionAValue:
      valueA,
    conditionBValue:
      valueB,
    difference,
    absoluteDifference:
      Math.abs(difference),
    valid:
      true,
  }
}
