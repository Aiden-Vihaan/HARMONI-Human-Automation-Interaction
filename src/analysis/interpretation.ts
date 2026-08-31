import type {
  InterpretationContext,
  InterpretationResult,
} from './interpretationTypes'

function formatSignedValue(
  value: number,
  decimals = 2,
): string {
  if (value > 0) {
    return `+${value.toFixed(decimals)}`
  }

  if (value < 0) {
    return value.toFixed(decimals)
  }

  return '0'
}

export function createInterpretation(
  context: InterpretationContext,
): InterpretationResult {
  let observedResult: string

  if (
    context.meanDifference === null
  ) {
    observedResult =
      'No valid mean difference could be estimated from the available paired observations.'
  } else if (
    context.meanDifference > 0
  ) {
    observedResult =
      `Condition B showed a higher observed ${context.metric} than Condition A in this dataset.`
  } else if (
    context.meanDifference < 0
  ) {
    observedResult =
      `Condition B showed a lower observed ${context.metric} than Condition A in this dataset.`
  } else {
    observedResult =
      `No mean difference was observed between Condition A and Condition B for ${context.metric}.`
  }

  const effectStatement =
    context.standardizedEffect === null
      ? 'The standardized effect could not be estimated from the available participant-level variability.'
      : `The standardized effect was ${formatSignedValue(
          context.standardizedEffect,
        )}, representing the observed mean difference relative to participant-level variability.`

  const methodologicalNote =
    'These results are descriptive. Effect magnitude does not establish statistical significance, causality, or practical importance by itself.'

  let dataQualityNote:
    | string
    | null = null

  if (
    context.missingParticipantCount >
    0
  ) {
    dataQualityNote =
      `${context.missingParticipantCount} participant-condition pair${
        context.missingParticipantCount ===
        1
          ? ''
          : 's'
      } were unavailable and excluded from paired difference calculations.`
  }

  return {
    observedResult,
    effectStatement,
    methodologicalNote,
    dataQualityNote,
  }
}
