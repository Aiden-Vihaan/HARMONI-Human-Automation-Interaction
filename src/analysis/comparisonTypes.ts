```ts
export interface ParticipantComparison {
  readonly participantId: string

  readonly conditionA: string

  readonly conditionB: string

  readonly metric: string

  readonly conditionAValue: number | null

  readonly conditionBValue: number | null

  readonly difference: number | null

  readonly absoluteDifference: number | null

  readonly valid: boolean
}

export interface DifferenceDistribution {
  readonly metric: string

  readonly conditionA: string

  readonly conditionB: string

  readonly meanDifference: number | null

  readonly medianDifference: number | null

  readonly minimumDifference: number | null

  readonly maximumDifference: number | null

  readonly standardDeviation: number | null

  readonly validParticipantCount: number

  readonly missingParticipantCount: number

  readonly positiveCount: number

  readonly negativeCount: number

  readonly zeroCount: number

  readonly positiveProportion: number | null

  readonly negativeProportion: number | null

  readonly zeroProportion: number | null
}
