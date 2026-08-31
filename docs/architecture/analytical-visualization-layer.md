# HARMONI — Day 37
## Analytical Visualization Layer

Project: HARMONI
Phase: Experimental Analytics
Day: 37
Status: In Progress

---

# 1. Purpose

Day 37 introduces the dedicated analytical visualization layer for HARMONI.

The analytical pipeline established during Days 34–36 now produces:

- Participant-condition summaries
- Participant comparisons
- Difference distributions
- Missingness information
- Directional information
- Descriptive statistics

The purpose of Day 37 is to expose these analytical results through a clear and research-oriented interface.

---

# 2. Core Architecture Principle

The visualization layer must not become the analytical engine.

The architecture is:

Raw Data
    ↓
Validation
    ↓
Trial Analysis
    ↓
Participant × Condition Analysis
    ↓
Participant Comparison
    ↓
Difference Distribution
    ↓
Visualization

The visualization layer consumes derived analytical objects.

---

# 3. Separation of Concerns

The following responsibilities must remain separate.

Data layer:

- stores observations
- preserves provenance
- preserves raw values

Analysis layer:

- calculates metrics
- calculates differences
- calculates distributions
- calculates descriptive statistics

Visualization layer:

- displays results
- allows filtering
- communicates uncertainty
- exposes sample size
- highlights missingness

---

# 4. Research Visualization Goal

The interface should answer:

"What happened?"

before attempting to answer:

"Why did it happen?"

The visualization should communicate observed data rather than automatically assigning psychological or causal explanations.

---

# 5. Primary Visualization

The primary visualization for Day 37 is a participant-level difference plot.

Each point represents one participant.

Example:

P001   +420 ms
P002   +310 ms
P003   -120 ms
P004   +580 ms
P005   +210 ms

The visualization therefore preserves participant-level variation.

---

# 6. Why Participant-Level Visualization

A single mean difference can conceal heterogeneity.

For example:

Mean difference:

+300 ms

could arise from:

+300
+300
+300
+300
+300

or:

+1500
+900
-800
-700
+600

Both datasets can produce similar aggregate values.

The participant-level visualization makes this difference visible.

---

# 7. Recommended Primary Chart

Use a horizontal participant difference plot.

X-axis:

Difference between conditions

Y-axis:

Participant

Example:

                 Condition B − Condition A

        -500     0      +500      +1000 ms
          |------|--------|----------|
P001                         ●
P002                 ●
P003          ●
P004                              ●
P005                    ●

---

# 8. Zero Reference

The plot must contain a clear zero reference.

Zero represents:

Condition B = Condition A

Positive values:

Condition B > Condition A

Negative values:

Condition B < Condition A

---

# 9. Signed Difference

The visualization must use the signed difference.

Primary metric:

difference = B − A

Do not replace signed differences with absolute differences.

---

# 10. Absolute Difference

Absolute difference may be displayed as an optional secondary metric.

It answers:

"How large was the difference?"

The signed difference answers:

"Which direction was the difference?"

Both concepts should remain distinct.

---

# 11. Distribution Summary

The visualization should also communicate:

Mean difference

Median difference

Minimum

Maximum

Standard deviation

Valid participant count

Missing participant count

---

# 12. Summary Cards

A research summary section may contain:

Mean Difference

Median Difference

Valid Participants

Missing Pairs

Positive Differences

Negative Differences

Zero Differences

---

# 13. Sample Size Visibility

The participant count must always remain visible.

Example:

Valid participants:
18

Missing pairs:
2

This prevents users from interpreting a metric without knowing how much participant-level data contributed to it.

---

# 14. Mean and Median

Mean and median should not be visually presented as interchangeable.

Mean:

arithmetic average

Median:

middle ordered observation

If the two differ substantially, the interface should preserve both values.

---

# 15. Participant Table

A detailed participant table should accompany the primary visualization.

Recommended columns:

Participant

Condition A

Condition B

Difference

Absolute Difference

Valid

---

# 16. Example Participant Table

Participant | A | B | Difference | Absolute Difference | Valid

P001 | 4800 | 5220 | +420 | 420 | Yes

P002 | 5100 | 5410 | +310 | 310 | Yes

P003 | 6000 | 5880 | -120 | 120 | Yes

P004 | 4900 | 5480 | +580 | 580 | Yes

P005 | 5200 | null | null | null | No

---

# 17. Missing Values

Missing values must remain explicit.

Example:

Condition B:
—

Difference:
—

Do not display:

0

because zero is a valid measurement.

---

# 18. Missingness Visualization

The interface should make missing participant pairs visible.

Example:

Valid:
18

Missing:
2

This is preferable to silently excluding the two participants.

---

# 19. Directional Summary

Display:

Positive:
8

Negative:
2

Zero:
0

Valid:
10

This gives a quick descriptive view of directional consistency.

---

# 20. Directional Proportions

Optional display:

Positive:
80%

Negative:
20%

Zero:
0%

The proportions should always be based on valid participant-level differences.

---

# 21. Avoid Misleading Visual Encoding

Do not rely exclusively on visual styling to communicate positive and negative values.

The numerical value should remain readable.

For accessibility, direction should be communicated through:

- position
- labels
- signs
- text

rather than color alone.

---

# 22. Filtering

The visualization layer should support analytical filters.

Potential filters:

Condition A

Condition B

Metric

Session

Participant

Validity

Experiment version

Protocol version

---

# 23. Filter Principle

Filtering should operate on analytical data.

The UI should not recalculate the underlying research metrics independently.

A filter should select the relevant analytical records and request or derive the appropriate already-defined analytical view.

---

# 24. Metric Selector

The architecture should support future metrics.

Possible metrics:

Takeover latency

Acknowledgement latency

Presentation latency

Completion rate

Other validated interaction measures

The visualization component should not hard-code a single research metric wherever avoidable.

---

# 25. Condition Selector

The user should be able to select:

Condition A

Condition B

The comparison direction should remain explicit.

Example:

Condition B − Condition A

---

# 26. Direction Label

Always display the comparison definition.

Example:

"Difference: Condition B − Condition A"

This prevents ambiguity when interpreting positive and negative values.

---

# 27. Tooltips

Participant points may expose:

Participant ID

Condition A value

Condition B value

Difference

Absolute difference

Validity

Session information when appropriate

---

# 28. Tooltip Principle

Tooltips should provide information already present in analytical objects.

They should not independently calculate new statistics.

---

# 29. Hover Interaction

Hovering over a participant should identify:

Participant P001

A:
4800 ms

B:
5220 ms

Difference:
+420 ms

---

# 30. Participant Selection

Selecting a participant may reveal:

- participant-level condition values
- difference
- trial count
- completion rate
- session count
- integrity information

This allows the researcher to move from aggregate visualization to participant-level evidence.

---

# 31. Drill-Down Architecture

Recommended navigation:

Experiment
    ↓
Condition Comparison
    ↓
Participant Distribution
    ↓
Participant
    ↓
Session
    ↓
Trial
    ↓
Event

This preserves analytical provenance.

---

# 32. Research Traceability

A displayed participant difference should be traceable to:

Participant

Condition A

Condition B

Underlying participant-condition summaries

Underlying trials

Underlying events

The visualization should never become a dead-end representation.

---

# 33. Empty State

If no valid participant differences exist:

Display:

"No valid paired observations available."

Also display:

Valid participants:
0

Missing pairs:
N

Do not render an artificial zero-centered chart.

---

# 34. Single Participant

If only one participant is available:

Show the participant difference.

Do not imply that a distribution is statistically stable.

The interface should expose:

Valid participants:
1

---

# 35. Small Samples

For small participant counts, descriptive visualization remains valid.

However, the interface should not use language implying population-level generalization.

---

# 36. Outliers

Extreme participant differences should remain visible.

Do not automatically remove them from the visualization.

If an outlier is later excluded through an explicit quality-control rule, that exclusion should be documented.

---

# 37. Data Quality Indicator

The visualization should expose basic data quality information.

Example:

Data quality:

Valid participant pairs: 18

Missing participant pairs: 2

Integrity-affected trials: 3

This provides context before interpretation.

---

# 38. Statistical Boundary

Day 37 remains descriptive.

The visualization must not automatically display:

- p-values
- significance stars
- confidence claims
- causal claims

unless those values are introduced through a documented later analytical module.

---

# 39. Interpretation Language

Preferred:

"Observed mean difference: +420 ms."

Avoid:

"Condition B causes a 420 ms increase."

The first statement describes the data.

The second makes a causal claim.

---

# 40. Accessibility

The visualization must support:

- readable text
- sufficient contrast
- keyboard navigation where applicable
- non-color-dependent interpretation
- clear axis labels
- explicit units
- accessible table representation

---

# 41. Units

Temporal metrics must always expose their unit.

Example:

Takeover latency:

420 ms

not:

420

---

# 42. Precision

Avoid unnecessary decimal precision.

For milliseconds, an appropriate display may be:

420 ms

rather than:

420.000000 ms

Internal calculations may retain greater precision.

Display precision should be controlled by the presentation layer.

---

# 43. Responsive Layout

The analytical interface should remain usable across:

Desktop

Tablet

Smaller laptop displays

The primary participant visualization should not become unreadable when the viewport becomes narrow.

---

# 44. Component Architecture

Recommended components:

DifferenceDistributionChart

ParticipantDifferenceTable

AnalysisSummaryCards

MetricSelector

ConditionSelector

AnalysisFilters

DataQualitySummary

ParticipantDetailPanel

---

# 45. Component Responsibility

DifferenceDistributionChart:

Displays participant-level differences.

ParticipantDifferenceTable:

Displays exact participant values.

AnalysisSummaryCards:

Displays aggregate descriptive statistics.

Selectors:

Change analytical view configuration.

DataQualitySummary:

Communicates valid/missing/integrity information.

---

# 46. No Analytical Logic in Components

Avoid:

const mean =
    values.reduce(...)

inside React components.

Instead:

const summary =
    summarizeDifferenceDistribution(
        comparisons
    )

The component should render:

summary.meanDifference

---

# 47. Derived Data Flow

Preferred:

Analysis Function
        ↓
DifferenceDistribution
        ↓
React Container
        ↓
Visualization Components
