```ts
export interface TrialAnalysis {
  readonly trialId: string

  readonly presentationLatencyMs:
    number | null

  readonly acknowledgementLatencyMs:
    number | null

  readonly takeoverLatencyMs:
    number | null

  readonly interventionCompleted:
    boolean

  readonly rejectedActionCount:
    number

  readonly integrityIssues:
    readonly string[]
}
