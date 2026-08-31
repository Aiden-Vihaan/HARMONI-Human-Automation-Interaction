```text
# HARMONI — Day 37
## Analytical Visualization Research Notes

---

# Research Focus

How should repeated-measures experimental results be visualized so that participant-level variation remains visible instead of being hidden by aggregate statistics?

---

# Central Problem

A single mean can conceal substantial heterogeneity.

Therefore, the visualization should expose individual participant differences alongside aggregate summaries.

---

# Primary Representation

The primary visualization is:

Participant-level difference plot.

Each point represents one participant-level comparison.

---

# Difference Definition

Difference:

Condition B − Condition A

Positive:

Condition B has a larger observed metric.

Negative:

Condition B has a smaller observed metric.

Zero:

Both conditions have equal observed values.

---

# Why Use Signed Differences?

Signed differences preserve direction.

Absolute differences remove direction.

Therefore:

signed difference = primary analytical representation

absolute difference = secondary magnitude representation

---

# Participant as Analytical Unit

The plot contains:

one point per valid participant.

It does not contain:

one point per trial.

This maintains the repeated-measures structure established in earlier analytical stages.

---

# Aggregate Context

The participant-level visualization is accompanied by:

Mean

Median

Standard deviation

Minimum

Maximum

Valid participant count

Missing participant count

---

# Missingness

Participants without valid paired observations are not plotted as zero.

They remain visible through the missing-pair count and participant table.

---

# Heterogeneity

Participant-level visualization allows the researcher to identify:

- consistent direction
- mixed direction
- extreme observations
- clustering
- broad variability

without automatically removing unusual observations.

---

# Research Transparency

A visualization should answer:

"What data contributed to this summary?"

The interface therefore exposes:

participant count

valid pair count

missing pair count

individual differences

---

# Interpretation Boundary

Visualization communicates observed data.

It does not automatically communicate:

causality

statistical significance

population-level generalization

psychological explanation

---

# Accessibility

The visualization should not rely exclusively on color.

Meaning should also be communicated through:

position

text

sign

labels

table representation

---

# Units

Every metric must communicate its measurement unit.

For example:

420 ms

rather than:

420

---

# UI Architecture

The visualization layer remains downstream from analysis.

```text
Analysis Functions
       ↓
Typed Analytical Objects
       ↓
Visualization Container
       ↓
Charts / Tables / Summary Cards
