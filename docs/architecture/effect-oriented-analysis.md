# HARMONI — Day 38
## Effect-Oriented Descriptive Analysis

Project: HARMONI
Phase: Advanced Experimental Analytics
Day: 38
Status: In Progress

---

# 1. Purpose

Day 38 extends HARMONI from raw difference distributions toward effect-oriented descriptive analysis.

The objective is to answer:

"How large is the observed difference relative to participant-level variability?"

The system must distinguish:

Raw Difference
    ↓
Standardized Effect Magnitude
    ↓
Interpretation

from:

Statistical Significance
    ↓
Hypothesis Testing

These are not the same concept.

---

# 2. Why Effect Magnitude Matters

A raw difference provides information in the original measurement unit.

Example:

Condition B − Condition A = +420 ms

This tells us the observed difference.

However, the magnitude of 420 ms may have different practical meaning depending on participant-level variability.

For example:

Dataset A:

+400
+420
+450
+390
+410

Dataset B:

-800
+1200
+300
-500
+700

Both may have similar means, but their variability is very different.

Therefore, HARMONI should retain both:

raw difference

and:

standardized effect magnitude.

---

# 3. Primary Effect Concept

Day 38 introduces a paired standardized effect measure.

The preferred descriptive representation is:

standardized effect =
mean participant difference
--------------------------------
standard deviation of participant differences

This corresponds to a paired standardized effect size concept.

---

# 4. Important Terminology

The system should refer to this as:

"standardized mean difference"

or:

"paired standardized effect"

where appropriate.

Avoid presenting it as evidence of statistical significance.

---

# 5. Mathematical Definition

Let:

d_i = B_i − A_i

for participant i.

The mean difference is:

mean(d)

The sample standard deviation of differences is:

SD(d)

The standardized effect is:

mean(d)
---------
SD(d)

---

# 6. Example

Participant differences:

+100
+200
+300
+400
+500

Mean:

300

Standard deviation:

approximately 158.1

Standardized effect:

300 / 158.1

≈ 1.90

The result indicates a large standardized observed difference relative to participant-level variability.

It does not establish statistical significance.

---

# 7. Why Pairing Matters

The effect measure must be calculated from:

within-participant differences.

It should not simply divide an independent-group mean difference by an unrelated pooled standard deviation.

The experimental structure is repeated-measures.

Therefore:

participant-level pairing

must be preserved.

---

# 8. Effect Calculation Pipeline

```text
Condition A
    ↓
Condition B
    ↓
Participant Pairing
    ↓
B − A
    ↓
Participant Difference Distribution
    ↓
Mean Difference
    ↓
SD of Differences
    ↓
Standardized Effect
