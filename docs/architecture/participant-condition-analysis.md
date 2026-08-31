# HARMONI — Day 35
## Participant-Level Condition Analysis

Project: HARMONI
Phase: Experimental Analytics
Day: 35
Status: In Progress

---

# 1. Purpose

Day 35 introduces participant-level condition analysis.

Day 34 established participant and session traceability.

Day 35 builds the next analytical layer:

Event
    ↓
Trial
    ↓
Participant × Condition
    ↓
Experiment

The primary goal is to prevent repeated trials from being treated as independent experimental units when the intended unit of comparison is the participant.

---

# 2. Analytical Problem

Consider an experiment with:

Participant P001:
    Condition A → 10 trials
    Condition B → 10 trials

Participant P002:
    Condition A → 10 trials
    Condition B → 10 trials

Participant P003:
    Condition A → 10 trials
    Condition B → 10 trials

There are:

60 trials

but only:

3 participants

For a repeated-measures comparison, the participant is the important experimental unit.

Therefore, HARMONI must be able to transform:

multiple trials

into:

one participant-condition summary.

---

# 3. New Analytical Hierarchy

The hierarchy becomes:

Participant
    ↓
Session
    ↓
Condition
    ↓
Trial
    ↓
Event

The derived analytical hierarchy becomes:

Event
    ↓
Trial Analysis
    ↓
Participant × Condition Summary
    ↓
Condition Summary
    ↓
Experiment Summary

---

# 4. Participant-Condition Unit

The participant-condition unit represents one participant's observations under one experimental condition.

Example:

Participant:
P001

Condition:
CONDITION-A

Trial count:
10

Mean takeover latency:
4820 ms

This is one participant-level analytical observation.

---

# 5. Why This Layer Matters

Suppose Participant P001 performs 20 trials while Participant P002 performs only 5.

A raw-trial mean would give P001 four times as much influence.

Participant-level aggregation can prevent this imbalance from automatically determining the condition-level estimate.

This is particularly important for repeated-measures experiments.

---

# 6. Participant-Level Aggregation

For each participant and condition combination:

1. Select all matching trials.
2. Assess trial validity.
3. Calculate descriptive statistics.
4. Calculate completion metrics.
5. Preserve missingness.
6. Preserve integrity information.

---

# 7. Participant-Level Metrics

Each participant-condition summary may contain:

participantId

conditionId

trialCount

completedTrialCount

completionRate

presentationLatency

acknowledgementLatency

takeoverLatency

rejectedActionCount

integrityIssueTrialCount

---

# 8. Metric Summary

Temporal measures should use the existing MetricSummary structure.

Example:

takeoverLatency:

mean
median
minimum
maximum
standardDeviation
validObservationCount
missingObservationCount

---

# 9. Participant-Level Mean

Suppose:

Trial 1 = 4000 ms
Trial 2 = 5000 ms
Trial 3 = 4500 ms

Participant-condition mean:

4500 ms

This value represents the participant's average observed response under that condition.

---

# 10. Participant-Level Median

The median should also be retained.

Example:

4000
4500
5000

Median:

4500 ms

Median provides a robust descriptive measure when observations are asymmetric.

---

# 11. Participant-Level Variability

Standard deviation describes the variation among the participant's trials.

However, a small number of trials may produce unstable estimates.

Therefore the number of valid observations must always accompany the variability estimate.

---

# 12. Missing Observations

Missing measurements are not zero.

Example:

4000
null
5000

Valid observations:

2

Missing observations:

1

Mean:

4500 ms

---

# 13. Completion Rate

For participant P001:

Completed trials:

8

Total trials:

10

Completion rate:

0.80

The underlying representation should retain:

0.80

The UI can display:

80%

---

# 14. Integrity Information

A participant-condition summary must preserve the number of trials containing integrity issues.

Example:

trialCount:
10

integrityIssueTrialCount:
2

The analysis should not silently discard those trials.

---

# 15. Quality-Controlled Dataset

Future analysis may require an analysis-eligible subset.

The architecture should support:

All participant-condition observations

and:

Quality-controlled participant-condition observations

without deleting the original observations.

---

# 16. Participant-Level Condition Difference

When two conditions are performed by the same participant, a within-participant difference can be calculated.

Example:

Condition A:
4800 ms

Condition B:
5300 ms

Difference:

B − A = 500 ms

This difference is associated with P001.

---

# 17. Why Within-Participant Differences Matter

A participant may have a naturally fast or slow response style.

For example:

P001:
A = 4.8 s
B = 5.3 s

P002:
A = 7.1 s
B = 7.6 s

The absolute values differ considerably.

However:

P001 difference = 0.5 s

P002 difference = 0.5 s

The within-participant difference isolates the directional change between conditions for each participant.

---

# 18. Difference Calculation Requirements

A condition difference should only be calculated when both required participant-condition metrics are valid.

If:

Condition A = 4800 ms

Condition B = null

then:

difference = null

The system must not substitute zero.

---

# 19. No Automatic Causal Interpretation

A positive difference does not automatically mean that one condition caused slower behaviour.

It represents an observed within-participant difference.

Causal interpretation depends on the experimental design.

---

# 20. No Inferential Statistics

Day 35 does not introduce:

- p-values
- confidence intervals
- hypothesis tests
- statistical significance
- regression
- mixed-effects models

Those belong to later analytical stages.

---

# 21. Unequal Trial Counts

The system must support:

P001:
Condition A → 10 trials
Condition B → 8 trials

P002:
Condition A → 5 trials
Condition B → 5 trials

The participant-condition summaries should remain valid independently.

---

# 22. Multiple Sessions

A participant may complete the same condition across multiple sessions.

Example:

P001
    Session 01
        Condition A
            5 trials

    Session 02
        Condition A
            5 trials

The participant-condition analysis may combine these observations only when the analysis specification explicitly allows it.

Session-level provenance must remain available.

---

# 23. Session Aggregation Policy

Day 35 should not permanently assume that all sessions are interchangeable.

The analysis API should make the aggregation scope explicit.

Possible scopes:

TRIAL

SESSION

PARTICIPANT

EXPERIMENT

---

# 24. Default Scope

The participant-condition summary represents the participant across the selected analysis dataset.

The dataset selection must determine which sessions are included.

This prevents hidden assumptions about session equivalence.

---

# 25. Participant Eligibility

A participant may be:

ELIGIBLE

INCOMPLETE

EXCLUDED

INVALID

The participant's status should not physically remove their raw observations.

---

# 26. Condition Completeness

A participant may have data for only one condition.

Example:

P005

Condition A:
10 trials

Condition B:
0 trials

This participant can still have a valid Condition A summary.

However, a within-participant A-versus-B difference cannot be calculated.

---

# 27. Balanced vs Unbalanced Data

Balanced design:

Every participant completes the same number of trials under every condition.

Unbalanced design:

Trial counts differ between participants or conditions.

HARMONI must support both.

---

# 28. Missing Condition

A missing condition should be represented explicitly.

Example:

participantId:
P005

conditionId:
CONDITION-B

trialCount:
0

This is different from:

condition not defined.

---

# 29. Condition Definition

Conditions should be defined independently from participant summaries.

Example:

CONDITION-A:
Baseline interaction

CONDITION-B:
Assistance-enabled interaction

The participant analysis consumes condition identifiers.

It should not infer their meaning.

---

# 30. Deterministic Aggregation

Participant-condition analysis must be deterministic.

Given identical TrialAnalysis input:

the resulting ParticipantConditionSummary must be identical.

---

# 31. Immutability

The aggregation layer must not mutate:

- raw events
- trial analysis objects
- participant records
- session records

All summaries are derived objects.

---

# 32. Separation of Concerns

The analytical architecture remains:

Data Collection
    ↓
Validation
    ↓
Trial Analysis
    ↓
Participant-Condition Analysis
    ↓
Condition Analysis
    ↓
Experiment Analysis
    ↓
Visualization

The React interface should consume analytical outputs rather than calculate them independently.

---

# 33. Participant-Condition Data Model

Recommended structure:

ParticipantConditionSummary

Fields:

participantId
conditionId
trialCount
completedTrialCount
completionRate
presentationLatency
acknowledgementLatency
takeoverLatency
rejectedActionCount
integrityIssueTrialCount

---

# 34. Within-Participant Comparison Model

A future comparison object may contain:

participantId

conditionA

conditionB

metric

conditionAValue

conditionBValue

difference

valid

This should remain separate from the raw participant-condition summaries.

---

# 35. Example

Participant:

P001

Condition A takeover latency:

4800 ms

Condition B takeover latency:

5300 ms

Difference:

500 ms

Interpretation:

Observed increase of 500 ms under Condition B for participant P001.

No causal conclusion is automatically generated.

---

# 36. Aggregation Pipeline

```text
TrialAnalysis[]
       ↓
Group by participant
       ↓
Group by condition
       ↓
Summarize valid observations
       ↓
ParticipantConditionSummary[]
