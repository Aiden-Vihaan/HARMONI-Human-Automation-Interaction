# HARMONI — Day 39
## Effect Visualization & Controlled Interpretation

---

# Research Focus

Day 39 focuses on translating analytical results into a transparent research-facing interface.

The objective is not to generate more statistics.

The objective is to make existing statistics interpretable without overstating the evidence.

---

# Analytical Sequence

The interface follows:

Condition comparison

↓

Participant-level differences

↓

Distribution

↓

Descriptive statistics

↓

Standardized effect

↓

Interpretation boundary

---

# Why This Matters

A research visualization should communicate both:

what was observed

and:

what cannot be concluded.

Without this distinction, dashboards can unintentionally transform descriptive measurements into unsupported claims.

---

# Participant-Level Evidence

Each plotted participant represents one valid paired observation.

This preserves the repeated-measures structure.

---

# Mean Difference

The mean difference remains in the original measurement unit.

Example:

+420 ms

This communicates the observed magnitude in a directly interpretable unit.

---

# Standardized Effect

The standardized effect provides an additional representation of magnitude relative to participant-level variability.

Example:

+1.25

---

# Effect vs Significance

The standardized effect does not establish statistical significance.

Therefore the interface does not display:

p-values

significance stars

"significant"

or:

"not significant"

unless a dedicated inferential analysis is later implemented.

---

# Effect vs Causality

An observed difference does not automatically establish causality.

Therefore the interface avoids:

"Condition B caused..."

and instead uses:

"Condition B showed a higher observed value..."

---

# Metric Semantics

Positive numerical direction does not automatically mean better performance.

The meaning depends on the metric.

Therefore the interpretation layer reports:

higher

lower

equal

before assigning any performance judgment.

---

# Deterministic Interpretation

Day 39 uses deterministic templates rather than generative AI.

Advantages:

- reproducibility
- auditability
- predictable language
- no hallucinated conclusions
- easier testing

---

# Missingness

Missing paired observations remain explicitly reported.

They are not silently discarded from the research narrative.

---

# Visualization + Table

The chart provides pattern recognition.

The table provides exact participant-level values.

Both representations are retained.

---

# Research Traceability

A displayed interpretation should be traceable to:

metric

conditions

participant differences

summary statistics

effect summary

data quality

---

# Accessibility

The interface should not rely solely on color.

Direction remains visible through:

position

sign

text

labels

tabular values

---

# Scientific Boundary

The interface communicates:

observed data

descriptive statistics

effect magnitude

data quality

It does not automatically communicate:

causality

statistical significance

population-level generalization

psychological mechanism

---

# Conclusion

Day 39 establishes the research interpretation layer.

HARMONI can now connect participant-level evidence with descriptive effect magnitude and controlled scientific language.

This creates a coherent analytical story without allowing the visualization layer to overstate the evidence.
