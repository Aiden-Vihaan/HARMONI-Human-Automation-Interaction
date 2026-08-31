```text
# HARMONI — Day 35
## Participant-Level Condition Analysis

---

# Research Focus

Day 35 addresses a central issue in repeated experimental interaction data:

How can repeated trials be transformed into participant-level observations without losing trial-level provenance?

---

# Core Principle

The same participant may contribute many observations.

Therefore:

number of trials

should not automatically be interpreted as:

number of independent experimental units.

---

# Participant × Condition

The participant-condition combination provides an intermediate analytical unit.

Example:

P001 × Condition A

contains all eligible observations for participant P001 under Condition A.

---

# Why This Structure Is Useful

Consider:

20 participants

× 2 conditions

× 10 trials

This produces:

400 trials

but:

40 participant-condition observations.

For a within-subject comparison, those 40 participant-condition observations are much closer to the structure needed for subsequent analysis than treating all 400 trials as independent.

---

# Within-Participant Comparison

Suppose:

P001:
Condition A = 4.8 seconds
Condition B = 5.3 seconds

The participant-level difference is:

0.5 seconds

The same calculation can be performed for each participant.

---

# Example Dataset

P001:
A = 4.8
B = 5.3
Difference = 0.5

P002:
A = 4.4
B = 4.9
Difference = 0.5

P003:
A = 5.1
B = 5.4
Difference = 0.3

These differences form a participant-level distribution.

---

# Important Limitation

Participant-level differences do not by themselves establish statistical significance.

They provide the observations required for later inferential analysis.

---

# Missing Conditions

If a participant has:

Condition A = 4.8

Condition B = missing

then a within-participant difference cannot be calculated.

The correct result is:

difference = null

---

# Unequal Trials

Participant-level summaries can handle unequal trial counts.

Example:

P001:
A → 10 trials
B → 8 trials

P002:
A → 6 trials
B → 6 trials

The system retains the actual counts.

---

# Session Considerations

A participant may complete a condition across multiple sessions.

Combining sessions should be an explicit analytical decision.

The system therefore retains session identity instead of permanently flattening it.

---

# Missingness

Missing observations should remain distinguishable from valid zero-valued observations.

This distinction is critical for temporal measurements.

---

# Integrity

Trials containing integrity issues should remain identifiable.

The analysis layer should allow later quality-control rules without destroying the original observations.

---

# Data Provenance

Participant-level summaries must remain traceable to their constituent trials.

The analytical architecture therefore follows:

Participant
→ Session
→ Condition
→ Trial
→ Event

---

# Privacy

Participant identifiers are pseudonymous.

No unnecessary personally identifiable information is required for the analysis layer.

---

# Statistical Boundary

Day 35 establishes the analytical structure required for repeated-measures analysis.

It does not yet perform:

- significance testing
- confidence interval estimation
- causal inference
- mixed-effects modeling

---

# Research Integrity

The architecture deliberately separates:

measurement

from:

interpretation.

The system calculates observed differences but does not automatically assign psychological or causal meaning to them.

---

# Conclusion

Day 35 introduces participant-level analytical units and within-participant condition comparisons.

This is an important transition from:

trial aggregation

toward:

research-oriented repeated-measures analysis.

The next analytical stage can examine the distribution of participant-level differences and develop effect-oriented descriptive measures while maintaining transparency about sample size and missingness.
