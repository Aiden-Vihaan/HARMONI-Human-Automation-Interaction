```ts
export interface EffectSummary {
  readonly metric: string

  readonly conditionA: string

  readonly conditionB: string

  readonly meanDifference: number | null

  readonly standardDeviationOfDifferences: number | null

  readonly standardizedEffect: number | null

  readonly absoluteStandardizedEffect: number | null

  readonly validParticipantCount: number

  readonly missingParticipantCount: number
}
