# HARMONI — Day 34
## Participant and Session Research Notes

---

# Research Question

How should repeated interaction observations be represented so that trial-level measurements remain traceable to the experimental participant and session that generated them?

---

# Core Observation

An experimental dataset may contain many observations from relatively few participants.

Therefore:

trial count ≠ participant count

and:

observation count ≠ independent sample size

---

# Repeated Measures

When the same participant performs multiple trials, those observations are related.

For example:

P001:
    Trial 1
    Trial 2
    Trial 3
    Trial 4

These observations should retain participant identity.

---

# Analytical Consequence

If a participant performs multiple trials under different conditions, the system should preserve the participant-condition relationship.

Example:

P001
    Condition A
        10 trials

    Condition B
        10 trials

This allows future within-participant comparisons.

---

# Pseudoreplication

A large number of repeated observations does not necessarily represent a large number of independent experimental units.

Example:

5 participants × 20 trials

produces:

100 trials

but only:

5 participants.

The analytical system must preserve this distinction.

---

# Session Effects

Multiple sessions may introduce additional sources of variation.

Examples:

- learning
- fatigue
- familiarization
- environmental differences
- technical interruptions
- changes in experimental configuration

Therefore session identity is retained even when it is not immediately used in the statistical analysis.

---

# Privacy

Participant identifiers are pseudonymous.

The analytical system does not require direct identifiers such as:

- names
- phone numbers
- email addresses
- home addresses

unless explicitly required by the experimental protocol.

---

# Data Minimization

Only variables necessary for experimental execution, integrity, analysis, and reproducibility should be retained.

Additional participant metadata should require a clear research justification.

---

# Provenance

Each analytical observation should be traceable through:

Participant
→ Session
→ Condition
→ Trial
→ Event

This supports reproducibility and debugging.

---

# Incomplete Data

Participants and sessions may be incomplete.

Example:

Participant P004

Condition A:
10 trials

Condition B:
6 trials

The missing trials should not be fabricated or silently removed.

---

# Exclusion

If an observation or participant is excluded from a particular analysis, the original data should remain available.

The analysis layer should record eligibility rather than physically deleting data.

---

# Statistical Boundary

Day 34 establishes structure only.

No inferential conclusions are made.

The project does not yet calculate:

- p-values
- confidence intervals
- statistical significance
- causal effects

---

# Future Direction

The participant/session hierarchy enables future participant-level summaries.

Example:

P001:
A = 4.82 s
B = 5.31 s

P002:
A = 4.40 s
B = 4.95 s

P003:
A = 5.02 s
B = 5.20 s

These participant-level observations can later support appropriate repeated-measures analysis.

---

# Research Integrity Principle

The architecture should make it difficult to accidentally perform an invalid analysis.

Participant identity therefore belongs in the analytical data model rather than being treated as optional UI metadata.

---

# Conclusion

Day 34 transforms HARMONI from a trial-centric analytics system into a participant-aware experimental analysis framework.

The system now preserves the distinction between:

events

trials

sessions

participants

conditions

and experiments.

This provides the structural foundation for more rigorous experimental analysis in later stages.
