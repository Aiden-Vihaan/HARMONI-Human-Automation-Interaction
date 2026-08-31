HARMONI — Day 41

Final Research Dashboard & Analytical Case Study

Project: HARMONI
Phase: Final Product Integration
Day: 41
Status: In Progress

---

1. Purpose

Day 41 integrates the analytical modules into HARMONI's final research-facing dashboard.

The dashboard must present a complete evidence chain:

Experiment
↓
Conditions
↓
Participants
↓
Measurements
↓
Participant Differences
↓
Descriptive Statistics
↓
Effect Magnitude
↓
Robustness
↓
Interpretation

---

2. Design Objective

The dashboard should not attempt to display every available number.

Instead, it should prioritize:

clarity

traceability

participant-level evidence

analytical transparency

scientific restraint.

---

3. Primary User

The primary user is a researcher or student analyzing human-subject experimental data.

The user should be able to inspect an experiment without requiring access to the source code.

---

4. Dashboard Question

The dashboard should answer:

"What happened between the experimental conditions, how consistent was the observation across participants, and how robust is the descriptive result?"

---

5. Dashboard Structure

The final dashboard should contain:

1. Experiment Overview
2. Condition Comparison
3. Participant Evidence
4. Descriptive Summary
5. Effect Analysis
6. Robustness & Quality Control
7. Participant-Level Table
8. Research Interpretation
9. Methodology
10. Data Provenance

---

6. Experiment Overview

Display:

Experiment name

Experiment objective

Metric

Participant count

Condition count

Analysis status

---

7. Condition Comparison

Display:

Condition A

Condition B

Comparison direction

Metric unit

---

8. Primary Result

The most visually prominent analytical result should be:

Mean Difference

Example:

+420 ms

Supporting information:

Median:
+390 ms

SD:
335 ms

---

9. Effect Result

Display:

Standardized Effect

Example:

+1.25

Supporting text:

"Observed mean difference relative to participant-level variability."

---

10. Participant Evidence

The participant-level visualization must remain central.

The user should be able to see:

distribution

direction

spread

individual observations.

---

11. Zero Reference

The participant difference chart must contain a clear zero reference.

This represents:

No observed condition difference.

---

12. Participant Table

Required columns:

Participant ID

Condition A

Condition B

Difference

Absolute Difference

Validity

---

13. Sorting

The table should support sorting by:

Participant

Difference

Absolute Difference

Condition A

Condition B

---

14. Exact Values

The table must display exact numerical values where appropriate.

Charts are complementary to the table.

---

15. Data Quality

Display:

Valid participants

Missing pairs

Completeness

Potential extreme observations

---

16. Robustness

Display:

Mean

Median

Mean-Median Gap

Directional consistency

Potential extreme observations

Sensitivity estimate

where available.

---

17. Interpretation

The dashboard should contain a controlled interpretation section.

Example:

"Condition B showed a higher observed takeover latency than Condition A in this dataset."

---

18. Effect Interpretation

Example:

"The standardized effect was +1.25, representing the observed mean difference relative to participant-level variability."

---

19. Research Boundary

Display:

"These results are descriptive. Effect magnitude does not establish statistical significance, causality, or practical importance by itself."

---

20. Methodology

The dashboard should provide a methodology section explaining:

participant pairing

difference calculation

mean calculation

median calculation

standardized effect

missing-data handling

robustness diagnostics.

---

21. Provenance

The user should be able to identify:

Dataset

Experiment

Metric

Conditions

Analysis version

Timestamp or analysis identifier

---

22. Analysis Version

Each analytical result should ideally have a version identifier.

Example:

Analysis version:

HARMONI-1.0

---

23. Reproducibility

The same:

dataset

configuration

analysis version

must produce the same analytical results.

---

24. Navigation

Recommended navigation:

Overview

Analysis

Participants

Quality Control

Methodology

---

25. Overview Page

The overview page should provide:

Experiment summary

Primary metric

Condition comparison

Participant count

Primary result

Effect magnitude

---

26. Analysis Page

The analysis page should provide:

participant distribution

mean

median

SD

effect

interpretation

---

27. Participants Page

The participants page should provide:

participant table

individual values

difference

validity

filtering

---

28. Quality-Control Page

The quality-control page should provide:

completeness

missingness

directional consistency

potential extreme observations

sensitivity information

---

29. Methodology Page

The methodology page should explain:

how observations become participant-level summaries

how conditions are compared

how differences are calculated

how effects are standardized

how quality-control diagnostics work.

---

30. Visual Hierarchy

Primary:

Mean Difference

Participant Distribution

Standardized Effect

Secondary:

Median

SD

Participant Count

Robustness

Tertiary:

Methodological details

---

31. Information Density

The dashboard should avoid presenting every statistic with equal visual weight.

Research dashboards should guide attention.

---

32. Progressive Disclosure

Advanced information may be placed behind:

details

expand

view methodology

participant drill-down

quality-control panel

---

33. Research Interpretation

The interpretation panel should appear after the evidence.

The order should be:

Evidence

↓

Statistics

↓

Interpretation

not:

Interpretation

↓

Evidence

---

34. No Decorative Statistics

Every number shown on the main dashboard must have an analytical purpose.

---

35. Visual Consistency

Use consistent:

number formatting

units

decimal precision

labels

spacing

terminology.

---

36. Units

Raw values should preserve their physical unit.

Example:

+420 ms

Standardized effects remain unitless.

Example:

+1.25

---

37. Sign Formatting

Positive values:

+420

Negative values:

-420

Zero:

0

---

38. Missing Values

Use:

Not available

or:

Not estimable

with context.

Avoid displaying:

0

when the value is missing.

---

39. Effect Not Estimable

Example:

"Standardized effect could not be estimated because participant-level variability could not be calculated."

---

40. Loading

During analysis loading:

"Preparing participant-level analysis..."

---

41. Empty State

"No valid paired observations are available for this comparison."

---

42. Error State

"Analytical results could not be generated."

Provide:

Retry

or:

Return to experiment

when supported.

---

43. Accessibility

The dashboard must remain understandable through:

text

labels

position

numeric signs

tables

and:

keyboard-accessible controls.

---

44. Color Independence

Color must not be the only indicator of:

positive

negative

warning

or:

missing.

---

45. Responsive Design

Desktop:

multi-column analytical layout

Tablet:

reduced columns

Mobile:

stacked analytical sections

---

46. Case Study

Day 41 also prepares the final project case study.

The case study should tell the story of:

Problem

Research Need

Design

Data Model

Analytical Pipeline

Validation

Result

Limitations

---

47. Case Study Title

Recommended:

"HARMONI: A Transparent Analytical Interface for Participant-Level Human Factors Experimentation"

---

48. Problem Statement

Researchers working with human-subject experimental data often need to move between raw observations, participant-level summaries, condition comparisons, statistical descriptions, and interpretation.

This transition can introduce ambiguity and obscure how an aggregate result was produced.

HARMONI explores a transparent interface that keeps these analytical levels connected.

---

49. Design Challenge

The central design challenge is:

How can an analytical interface communicate meaningful experimental differences without hiding participant-level variation or overstating statistical evidence?

---

50. Solution

HARMONI organizes the analysis around a traceable evidence chain:

Raw Event

↓

Trial

↓

Participant

↓

Condition

↓

Difference

↓

Effect

↓

Robustness

↓

Interpretation

---

51. Key Design Decisions

1. Preserve participant-level pairing.
2. Keep raw differences visible.
3. Separate effect magnitude from significance.
4. Expose missing data.
5. Flag rather than automatically delete extreme observations.
6. Use deterministic interpretation.
7. Keep exact participant values accessible.

---

52. Research Contribution

HARMONI is not presented as a replacement for established statistical software.

Instead, it is a transparent analytical interface that emphasizes:

traceability

participant-level evidence

interpretability

and:

responsible communication.

---

53. Limitations

The case study must explicitly acknowledge:

- descriptive analysis is not causal inference,
- standardized effect does not establish significance,
- IQR diagnostics do not prove data invalidity,
- small samples limit generalizability,
- metric semantics affect interpretation,
- domain-specific inferential methods may be required.

---

54. Future Work

Possible future extensions:

- confidence intervals
- inferential testing
- Bayesian analysis
- hierarchical models
- repeated-measures statistical models
- automated report generation
- longitudinal analysis
- experiment configuration management
- accessibility studies
- usability evaluation.

---

55. Final Dashboard Acceptance

The dashboard is complete when a researcher can answer:

What experiment am I looking at?

What conditions are being compared?

What metric is being analyzed?

How many participants contributed?

What happened at participant level?

What is the average difference?

How variable are the observations?

What is the standardized effect?

Are there missing observations?

Are there potential extreme observations?

How sensitive is the descriptive summary?

What can I conclude?

What can I not conclude?

---

56. Day 41 Deliverables

[ ] Integrate final dashboard.
[ ] Integrate participant difference visualization.
[ ] Integrate effect summary.
[ ] Integrate robustness summary.
[ ] Integrate participant table.
[ ] Integrate interpretation layer.
[ ] Add methodology panel.
[ ] Add provenance information.
[ ] Add loading state.
[ ] Add empty state.
[ ] Add error state.
[ ] Validate responsive layout.
[ ] Validate accessibility.
[ ] Complete case-study structure.
[ ] Document limitations.
[ ] Document future work.

---

57. Final Architecture

DATA INGESTION
      ↓
VALIDATION
      ↓
TRIAL ANALYSIS
      ↓
PARTICIPANT SUMMARY
      ↓
CONDITION COMPARISON
      ↓
DIFFERENCE ANALYSIS
      ↓
EFFECT ANALYSIS
      ↓
ROBUSTNESS ANALYSIS
      ↓
INTERPRETATION
      ↓
RESEARCH DASHBOARD
      ↓
CASE STUDY

---

58. Day 41 Outcome

Day 41 transforms HARMONI into a coherent research-facing analytical product.

The project is no longer represented primarily as individual technical components.

Instead, the components form one continuous analytical narrative:

data

↓

participant evidence

↓

condition difference

↓

effect magnitude

↓

robustness

↓

interpretation.

The final day will focus on validation, reproducibility, documentation, and portfolio release.
