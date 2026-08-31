# HARMONI — Day 38
## Effect-Oriented Descriptive Analysis

---

# Research Question

How can HARMONI describe the magnitude of an observed repeated-measures condition difference while preserving participant-level variability?

---

# Raw Difference

For every participant:

difference = Condition B − Condition A

This retains the original measurement unit.

Example:

+420 ms

---

# Standardized Difference

The observed mean difference can be expressed relative to the standard deviation of participant-level differences.

standardized effect:

mean difference
----------------
SD of differences

---

# Why Standardize?

Raw differences depend on the measurement scale.

A standardized representation provides an additional description of magnitude relative to participant-level variability.

---

# Repeated-Measures Structure

The standardization is based on paired participant differences.

This preserves the within-participant design.

---

# Interpretation

A positive standardized effect means the observed mean difference is positive relative to participant-level variability.

A negative standardized effect means the observed mean difference is negative.

The magnitude indicates how large the observed difference is relative to the variability of participant-level differences.

---

# Important Limitation

A standardized effect is not a p-value.

It does not determine statistical significance.

It does not establish causality.

It does not automatically establish practical importance.

---

# Zero Variability

If every participant has exactly the same difference:

SD = 0

The standardized effect is undefined.

HARMONI therefore returns:

null

rather than:

Infinity

or:

NaN

---

# Small Samples

For one valid participant:

sample standard deviation cannot be estimated.

Therefore:

standardized effect = null

The raw participant difference remains available.

---

# Missingness

Participants without valid paired measurements do not contribute to the effect calculation.

They remain counted as missing.

---

# Metric Semantics

Positive does not automatically mean:

better

or:

worse.

The meaning depends on the metric.

For example:

higher latency may indicate slower response,

while higher accuracy may indicate better performance.

Therefore HARMONI reports direction first and interpretation second.

---

# Research Transparency

Every effect summary should expose:

- metric
- condition A
- condition B
- mean difference
- SD of differences
- standardized effect
- valid participant count
- missing participant count

---

# Conclusion

Day 38 introduces standardized descriptive effect magnitude while maintaining strict separation between:

observed measurement

effect magnitude

statistical inference

causal interpretation.

This provides the analytical foundation required for the final visualization and validation stages.
