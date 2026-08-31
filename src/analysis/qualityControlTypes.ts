export interface QualityControlSummary {
  readonly totalParticipantCount: number

  readonly validParticipantCount: number

  readonly missingParticipantCount: number

  readonly completenessPercentage: number

  readonly positiveDifferenceCount: number

  readonly negativeDifferenceCount: number

  readonly zeroDifferenceCount: number

  readonly potentialExtremeObservationCount: number

  readonly meanDifference: number | null

  readonly medianDifference: number | null

  readonly meanMedianGap: number | null
}

export interface RobustnessSummary {
  readonly primaryMean: number | null

  readonly median: number | null

  readonly trimmedMean: number | null

  readonly directionalConsistency: number | null

  readonly potentialExtremeObservationCount: number

  readonly primaryEffect: number | null

  readonly sensitivityEffect: number | null
}

export interface ExtremeObservation {
  readonly index: number

  readonly value: number

  readonly lowerBoundary: number

  readonly upperBoundary: number
}
