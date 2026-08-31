```ts
export interface InterpretationContext {
  readonly metric: string

  readonly conditionA: string

  readonly conditionB: string

  readonly meanDifference: number | null

  readonly standardizedEffect: number | null

  readonly standardDeviationOfDifferences: number | null

  readonly validParticipantCount: number

  readonly missingParticipantCount: number
}

export interface InterpretationResult {
  readonly observedResult: string

  readonly effectStatement: string

  readonly methodologicalNote: string

  readonly dataQualityNote: string | null
}
