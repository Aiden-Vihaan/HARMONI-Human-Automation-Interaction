# HARMONI — Day 34
## Participant and Session Architecture

Project: HARMONI
Phase: Experimental Analytics
Day: 34
Status: In Progress

---

# 1. Purpose

Day 34 introduces participant and session structure into the HARMONI experimental analysis pipeline.

Until Day 33, the analytical hierarchy was:

Event
  ↓
Trial
  ↓
Condition
  ↓
Experiment

Day 34 extends this structure to:

Participant
  ↓
Session
  ↓
Condition
  ↓
Trial
  ↓
Event

This change makes repeated-measures analysis possible while preserving the relationship between observations and the participant/session from which they originated.

---

# 2. Motivation

Experimental interaction data is not simply a collection of independent trials.

A participant may complete multiple trials:

Participant P001
    ↓
Session S001
    ↓
Condition A
    ├── Trial 001
    ├── Trial 002
    ├── Trial 003
    └── Trial 004

The observations from these trials are related because they originate from the same participant.

Therefore, the analytical system must preserve participant identity at the level required for the experimental design.

---

# 3. Research Principle

A trial is an observation.

A participant is the unit from which repeated observations may originate.

Therefore:

Multiple trials ≠ multiple independent participants.

The analysis architecture must preserve this distinction.

---

# 4. New Hierarchy

The preferred hierarchy is:

Participant
    ↓
Session
    ↓
Condition
    ↓
Trial
    ↓
Event

However, not every experiment necessarily requires multiple sessions.

The data model should therefore support:

Participant
    ↓
Session
    ↓
Trial

and optionally:

Trial
    ↓
Condition

depending on the final experimental design.

---

# 5. Participant

A participant represents one experimental subject.

Example:

participantId:
P001

The identifier should be pseudonymous.

The analytical dataset must not require personally identifiable information.

---

# 6. Participant Identifier

Participant identifiers should follow a stable format.

Example:

P001
P002
P003

The identifier is used for analytical grouping.

It should not encode:

- name
- email
- phone number
- address
- date of birth
- other unnecessary personal information

---

# 7. Privacy by Design

HARMONI should follow data minimization.

The analytical layer should store only information required for:

- experiment execution
- data integrity
- analysis
- reproducibility

Personally identifiable information should remain outside the analytical dataset unless explicitly required by the experimental protocol.

---

# 8. Session

A session represents one continuous experimental interaction period.

Example:

Participant P001

Session S001
    Trial 001
    Trial 002
    Trial 003

Session S002
    Trial 004
    Trial 005

A participant can therefore have multiple sessions.

---

# 9. Why Sessions Matter

Session boundaries may influence behavioural measurements.

Potential factors include:

- fatigue
- learning
- familiarization
- interruptions
- environmental changes
- system configuration changes
- temporal separation between sessions

Therefore, session identity should remain available even if the current analysis does not use it.

---

# 10. Session Identifier

A session identifier should be unique within the experiment.

Example:

S001
S002

A stronger implementation may use:

P001-S001

This makes accidental cross-participant session collisions less likely.

---

# 11. Trial Identity

Trial identity remains unique.

Example:

P001-S001-T001

This creates a traceable relationship:

Participant:
P001

Session:
S001

Trial:
T001

---

# 12. Trial Analysis Extension

TrialAnalysis should contain enough information to trace a trial back to its participant and session.

Recommended fields:

participantId
sessionId
trialId
conditionId

---

# 13. Example TrialAnalysis

Example:

participantId:
P001

sessionId:
P001-S001

trialId:
P001-S001-T001

conditionId:
CONDITION-A

This allows analysis at several levels.

---

# 14. Analytical Levels

The system can now calculate:

Trial-level measures

Participant-level summaries

Condition-level summaries

Session-level summaries

Experiment-level summaries

---

# 15. Trial Level

Example:

P001-S001-T001

Takeover latency:
4200 ms

Acknowledgement latency:
1100 ms

Completion:
true

This remains the most granular derived analytical level.

---

# 16. Participant Level

A participant may have:

10 trials in Condition A

10 trials in Condition B

Participant-level analysis can therefore calculate:

Mean response latency for A

Mean response latency for B

Difference between A and B

Completion rate

Variability

This produces a participant-level representation of the experiment.

---

# 17. Why Participant-Level Aggregation Matters

Suppose:

Participant P001:
10 trials

Participant P002:
10 trials

Participant P003:
10 trials

The experiment contains:

30 trials

but only:

3 participants

These are not equivalent sample sizes.

The participant-level structure prevents the system from confusing:

n = 30 observations

with:

n = 3 participants

---

# 18. Avoiding Pseudoreplication

Pseudoreplication occurs when repeated observations from the same experimental unit are treated as independent replicates.

Example:

Participant P001 contributes 20 trials.

Participant P002 contributes 2 trials.

Treating all 22 observations as equally independent can distort the interpretation of the experiment.

HARMONI therefore preserves participant identity.

---

# 19. Participant-Level Condition Summary

A future participant-condition summary may look like:

Participant:
P001

Condition:
CONDITION-A

Trial count:
10

Mean takeover latency:
4820 ms

Median:
4700 ms

Completion rate:
0.90

This produces one analytical unit for that participant-condition combination.

---

# 20. Experimental Condition Comparison

Instead of immediately comparing every raw trial:

Trial
Trial
Trial
Trial
Trial

the system can eventually support:

Participant P001:
Condition A → 4.82 s
Condition B → 5.31 s

Participant P002:
Condition A → 4.40 s
Condition B → 4.95 s

Participant P003:
Condition A → 5.02 s
Condition B → 5.20 s

This structure is much more appropriate for repeated-measures experimental analysis.

---

# 21. Participant-Level Difference

For within-participant conditions:

difference =
Condition B metric -
Condition A metric

Example:

Condition A:
4.82 s

Condition B:
5.31 s

Difference:
0.49 s

This difference is calculated within the same participant before aggregating across participants.

---

# 22. No Inferential Statistics Yet

Day 34 does not introduce:

- p-values
- confidence intervals
- hypothesis tests
- statistical significance
- effect-size claims

The purpose is to establish correct data structure.

---

# 23. Participant Metadata

The core analytical participant object should remain minimal.

Recommended:

participantId
enrollmentTimestamp
status

Optional experimental metadata should be introduced only when justified by the protocol.

---

# 24. Demographic Data

Demographic information should not be added merely because it is technically possible.

If demographic variables are required by the experimental design, they should:

- have a clear research purpose
- be documented
- be minimized
- be separated from unnecessary identifying information

---

# 25. Session Metadata

A session may contain:

sessionId
participantId
startedAt
endedAt
status

Optional:

environmentVersion
experimentVersion
protocolVersion

These fields support reproducibility.

---

# 26. Experiment Versioning

A session should ideally record which experiment/protocol version produced the data.

Example:

experimentVersion:
1.0.0

This becomes useful if the experiment changes during development.

---

# 27. Protocol Version

A protocol version identifies the experimental procedure.

Example:

protocolVersion:
2026.08

If task timing or interaction rules change later, the dataset can distinguish between protocol versions.

---

# 28. Data Provenance

Each trial should be traceable:

Participant
    ↓
Session
    ↓
Experiment Version
    ↓
Condition
    ↓
Trial
    ↓
Events
    ↓
Derived Measures

This improves reproducibility.

---

# 29. Session State

Possible session states:

NOT_STARTED

IN_PROGRESS

COMPLETED

ABORTED

INVALID

The exact enum should be kept small and meaningful.

---

# 30. Trial State

Possible trial states:

NOT_STARTED

IN_PROGRESS

COMPLETED

ABORTED

INVALID

A completed trial should not automatically imply that every metric is available.

---

# 31. Missing Measurements

A trial can be completed while one measurement is missing.

Example:

Trial completed:
true

Takeover latency:
null

This should remain a valid state rather than being silently converted to zero.

---

# 32. Aborted Sessions

An aborted session should remain represented.

Example:

Participant P001

Session S002

Status:
ABORTED

Trials completed:
6

Trials started:
8

The incomplete session should not be silently deleted.

---

# 33. Incomplete Participants

A participant may not complete the full experiment.

Example:

Participant P004

Condition A:
10 trials

Condition B:
6 trials

The system should support unequal trial counts.

---

# 34. Participant Exclusion

Participant exclusion should not be implemented as physical deletion.

Instead, preserve the original data and maintain an explicit analysis eligibility state.

Example:

analysisEligible:
false

reason:
protocol violation

This keeps the research dataset auditable.

---

# 35. Raw vs Derived Data

Raw event data remains immutable.

TrialAnalysis is derived.

Participant summaries are derived.

Condition summaries are derived.

Experiment summaries are derived.

Architecture:

Raw Events
    ↓
Trial Analysis
    ↓
Participant / Condition Analysis
    ↓
Experiment Analysis

---

# 36. Separation of Concerns

The following layers should remain independent:

Data collection

Data validation

Trial analysis

Participant aggregation

Condition aggregation

Experiment aggregation

Visualization

No React component should become the source of analytical truth.

---

# 37. Deterministic Analysis

Participant-level analysis must be deterministic.

Same input:

same participant

same session

same trials

same condition

should produce the same analytical result.

---

# 38. Future Statistical Analysis

The new structure prepares HARMONI for methods appropriate to repeated-measures designs.

Potential future methods include:

- paired comparisons
- within-subject effect estimation
- repeated-measures models
- mixed-effects models
- participant-level confidence intervals
- condition-level effect sizes

The appropriate method will depend on the final experimental protocol and sample structure.

---

# 39. Example Complete Dataset

Participant P001
    Session S001
        Condition A
            Trial 001
            Trial 002
            Trial 003

        Condition B
            Trial 004
            Trial 005
            Trial 006

Participant P002
    Session S001
        Condition A
            Trial 001
            Trial 002
            Trial 003

        Condition B
            Trial 004
            Trial 005
            Trial 006

This structure preserves both:

within-participant repetition

and:

between-participant variation.

---

# 40. Day 34 Deliverables

[ ] Add participantId to TrialAnalysis.
[ ] Add sessionId to TrialAnalysis.
[ ] Define Participant model.
[ ] Define Session model.
[ ] Define session status.
[ ] Define participant status/eligibility.
[ ] Add experiment version.
[ ] Add protocol version.
[ ] Implement participant grouping.
[ ] Implement participant-condition grouping.
[ ] Preserve incomplete sessions.
[ ] Preserve incomplete participants.
[ ] Add tests for repeated participants.
[ ] Add tests for unequal trial counts.
[ ] Add tests for multiple sessions.
[ ] Add documentation.

---

# 41. Acceptance Principle

The system must be able to answer:

"Which participant and session produced this trial?"

without requiring access to raw event reconstruction.

---

# 42. Final Architecture

The HARMONI analytical hierarchy is now:

Participant
    ↓
Session
    ↓
Condition
    ↓
Trial
    ↓
Event

Derived analysis flows upward:

Event
    ↓
Trial Analysis
    ↓
Participant-Condition Analysis
    ↓
Condition Analysis
    ↓
Experiment Analysis

---

# 43. Day 34 Outcome

Day 34 establishes the structural foundation required for scientifically responsible repeated-measures analysis.

The project can now distinguish:

number of trials

from:

number of participants

and:

number of sessions.

This distinction is essential for avoiding incorrect assumptions about statistical independence in later analysis.
