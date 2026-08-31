HARMONI — Day 40

Robustness Analysis & Data Quality Control

Project: HARMONI
Phase: Final Analytical Validation
Day: 40
Status: In Progress

---

1. Purpose

Day 40 introduces the robustness and quality-control layer of HARMONI.

The objective is to determine whether the observed analytical pattern is:

- supported by sufficient participant-level observations,
- sensitive to missing data,
- dominated by a small number of participants,
- dependent on extreme observations,
- internally consistent across participants,
- and sufficiently transparent for research interpretation.

The goal is not to make the result "look better."

The goal is to determine how stable the descriptive result is under reasonable analytical checks.

---

2. Research Question

The central Day 40 question is:

"How robust is the observed condition difference to participant-level variation and common data-quality concerns?"

---

3. Why Robustness Matters

An aggregate mean can hide important structure.

For example:

Participant differences:

+50
+60
+70
+80
+5000

The mean may suggest a large positive difference even though most participants show relatively small differences.

Therefore HARMONI must inspect:

- individual observations,
- distribution,
- central tendency,
- variability,
- missingness,
- extreme observations.

---

4. Core Principle

HARMONI must never remove observations simply because they make a result inconvenient.

Outlier detection is therefore treated as:

diagnostic analysis

rather than:

automatic deletion.

---

5. Robustness Dimensions

Day 40 evaluates five dimensions:

1. Participant completeness
2. Distributional structure
3. Extreme observations
4. Sensitivity of central tendency
5. Analytical reproducibility

---

6. Participant Completeness

The system should report:

Total participants

Valid paired participants

Missing paired participants

Completeness percentage

---

7. Completeness Formula

Completeness:

valid paired participants

total expected participants

× 100

---

8. Example

Total:

20 participants

Valid paired observations:

18

Completeness:

18 / 20 × 100

= 90%

---

9. Missingness Interpretation

A missing participant pair does not automatically indicate a problematic dataset.

However, missingness must be visible.

The interface should never silently hide the number of excluded observations.

---

10. Distributional Inspection

HARMONI should inspect participant-level differences before interpreting aggregate statistics.

Required descriptive values:

- minimum
- maximum
- mean
- median
- standard deviation
- valid n

---

11. Mean vs Median

Mean is sensitive to extreme observations.

Median is more resistant to extreme observations.

Comparing both provides a useful diagnostic.

Example:

Mean:
+420 ms

Median:
+300 ms

The difference suggests that the distribution may not be symmetric.

---

12. Mean-Median Gap

HARMONI may calculate:

meanMedianGap =
meanDifference − medianDifference

This is descriptive only.

It should not automatically be interpreted as proof of skewness.

---

13. Extreme Observation Detection

Day 40 introduces diagnostic identification of potentially extreme participant-level differences.

The system may use an IQR-based rule.

---

14. IQR

IQR:

Q3 − Q1

where:

Q1 = first quartile

Q3 = third quartile

---

15. IQR Diagnostic Boundaries

Lower boundary:

Q1 − 1.5 × IQR

Upper boundary:

Q3 + 1.5 × IQR

Observations outside these boundaries may be flagged as potential extreme observations.

---

16. Important Limitation

An IQR flag does not mean:

invalid participant

bad data

measurement error

participant exclusion

The observation remains part of the primary analysis unless an explicit research protocol states otherwise.

---

17. Diagnostic Label

Preferred label:

"Potential extreme observation"

Avoid:

"Invalid participant"

unless validity has independently been established.

---

18. Robustness Comparison

The interface should optionally compare:

Primary mean

Median

Trimmed descriptive estimate

where appropriate.

However, alternate estimates must never silently replace the primary estimate.

---

19. Trimmed Analysis

If implemented, a trimmed mean may be used as a sensitivity analysis.

Example:

Primary mean:
+420 ms

Sensitivity estimate:
+360 ms

The system should present both values.

---

20. Why Sensitivity Analysis?

Sensitivity analysis asks:

"Would the broad descriptive pattern change under a reasonable alternative summary method?"

This is different from attempting to optimize the result.

---

21. No Result Fishing

The system must not repeatedly test alternative methods until a preferred result appears.

The primary analysis remains pre-defined.

Sensitivity analyses are secondary diagnostics.

---

22. Sign Stability

One useful diagnostic is the proportion of participant differences sharing the same direction.

Example:

Positive:
15

Negative:
3

Zero:
0

Valid:
18

Positive proportion:

15 / 18

= 83.3%

---

23. Directional Consistency

Directional consistency describes how many participants show the same sign as the mean effect.

It does not establish statistical significance.

---

24. Example

Mean difference:

+420 ms

Positive participant differences:

15 / 18

This indicates that most valid participants had a positive observed difference.

---

25. Conflicting Participants

If:

Mean difference:
+420 ms

but:

8 participants positive
10 participants negative

then the aggregate mean is potentially being influenced by the magnitude of individual differences.

The interface should make this visible.

---

26. Participant-Level Evidence

The aggregate result should never be shown without the participant-level distribution somewhere in the analytical view.

---

27. Robustness Summary

Recommended summary:

ROBUSTNESS

Valid participants: 18 / 20
Completeness: 90%

Mean difference: +420 ms
Median difference: +390 ms

Positive differences: 15
Negative differences: 3
Zero differences: 0

Potential extreme observations: 1

---

28. Interpretation

The system may generate:

"Most valid participant-level differences were positive."

But it must not automatically generate:

"Most participants performed better."

unless metric semantics explicitly support that interpretation.

---

29. Extreme Observation Panel

Example:

Potential extreme observations:

P017

Difference:
+2,140 ms

Diagnostic boundary:
+1,780 ms

Status:
Flagged for review

---

30. No Automatic Removal

The primary analysis continues to include P017.

The interface should state:

"This observation is flagged for diagnostic review and has not been automatically removed."

---

31. Quality-Control Categories

HARMONI should distinguish:

Data completeness

Data validity

Distributional diagnostics

Analytical sensitivity

---

32. Data Completeness

Measures:

How much expected participant-level data is available?

---

33. Data Validity

Measures:

How many observations satisfy the defined structural and numerical requirements?

---

34. Distributional Diagnostics

Measures:

What does the participant-level difference distribution look like?

---

35. Analytical Sensitivity

Measures:

Does the descriptive result change substantially under reasonable alternative summaries?

---

36. Quality-Control Object

Recommended structure:

QualityControlSummary

totalParticipantCount

validParticipantCount

missingParticipantCount

completenessPercentage

positiveDifferenceCount

negativeDifferenceCount

zeroDifferenceCount

potentialExtremeObservationCount

meanDifference

medianDifference

meanMedianGap

---

37. Robustness Object

Recommended structure:

RobustnessSummary

primaryMean

median

optionalTrimmedMean

directionalConsistency

potentialExtremeObservationCount

primaryEffect

sensitivityEffect

---

38. Determinism

Given identical input:

quality-control output must remain identical.

---

39. Immutability

Quality-control analysis must not mutate:

raw observations

participant summaries

difference distributions

primary analytical results.

---

40. Missing Values

Missing values must remain distinct from:

zero

negative

positive

---

41. Numerical Safety

The implementation must guard against:

NaN

Infinity

-Infinity

empty arrays

single observations

zero IQR

zero variance

---

42. Zero IQR

If:

Q1 = Q3

then:

IQR = 0

The system must avoid producing misleading extreme-observation boundaries.

The result should be represented explicitly as:

"No IQR-based extreme observations identified."

when all valid observations are identical or the rule cannot meaningfully distinguish extremes.

---

43. Small Sample Caution

Distributional diagnostics become less informative with very small participant counts.

Therefore HARMONI should not claim that an IQR-based diagnostic proves that an observation is an outlier.

---

44. Robustness Language

Preferred:

"Potential extreme observation"

"Diagnostic sensitivity"

"Participant-level variability"

"Descriptive robustness"

Avoid:

"Bad data"

"Wrong participant"

"Proven outlier"

unless independently established.

---

45. Primary vs Sensitivity Results

Primary analysis:

Predefined

Stable

Clearly labeled

Sensitivity analysis:

Secondary

Diagnostic

Clearly labeled

---

46. Research Transparency

The interface should answer:

How many participants contributed?

How many were excluded?

Why were they excluded?

How variable were the differences?

Were potentially extreme observations present?

Did the broad descriptive pattern change under sensitivity analysis?

---

47. Final Day 40 Interface

Recommended structure:

DATA QUALITY
18 / 20 valid
90% completeness

PARTICIPANT DISTRIBUTION
[Difference Plot]

PRIMARY RESULT
Mean: +420 ms
Median: +390 ms

DIRECTIONAL CONSISTENCY
15 positive
3 negative

DIAGNOSTICS
1 potential extreme observation

SENSITIVITY
Primary mean: +420 ms
Median: +390 ms

INTERPRETATION
Descriptive result...

---

48. Scientific Boundary

Robustness analysis does not transform descriptive data into causal evidence.

It only provides additional information about:

stability

variability

completeness

and:

sensitivity.

---

49. Testing Requirements

Test:

- complete dataset
- missing participant pairs
- all positive differences
- all negative differences
- mixed signs
- identical values
- extreme values
- zero IQR
- single observation
- empty input
- non-finite values

---

50. Day 40 Deliverables

[ ] Implement completeness calculation.
[ ] Implement directional counts.
[ ] Implement mean-median comparison.
[ ] Implement quartile calculation.
[ ] Implement IQR diagnostic.
[ ] Implement potential extreme observation flagging.
[ ] Preserve flagged observations in primary analysis.
[ ] Implement sensitivity summary.
[ ] Implement robustness summary.
[ ] Add data-quality UI.
[ ] Add diagnostic UI.
[ ] Add robustness interpretation.
[ ] Add unit tests.
[ ] Add edge-case tests.
[ ] Add methodological documentation.

---

51. Acceptance Principle

HARMONI must be able to communicate not only:

"What is the observed effect?"

but also:

"How much participant-level variation exists?"

"How complete is the dataset?"

"Are there potentially extreme observations?"

"Does the descriptive pattern remain similar under reasonable alternative summaries?"

---

52. Day 40 Outcome

Day 40 establishes the quality-control and robustness layer of HARMONI.

The system now distinguishes:

primary analysis

diagnostic analysis

sensitivity analysis

and:

research interpretation.

No observation is silently removed merely because it changes the result.

The objective is transparency rather than result optimization.
