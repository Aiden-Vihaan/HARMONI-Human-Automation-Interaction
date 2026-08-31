# HARMONI — Day 36
## Participant-Level Difference Distribution Analysis

Project: HARMONI
Phase: Experimental Analytics
Day: 36
Status: In Progress

---

# 1. Purpose

Day 36 introduces participant-level difference distribution analysis.

Day 35 established:

Trial
    ↓
Participant × Condition
    ↓
Within-Participant Difference

Day 36 extends this into:

Participant Differences
    ↓
Distribution Analysis
    ↓
Effect-Oriented Descriptive Summary

The purpose is to understand not only the average difference between conditions, but also how consistently that difference occurs across participants.

---

# 2. Scientific Motivation

A condition-level mean difference can hide substantial participant-level variation.

Example:

Participant 1:
+800 ms

Participant 2:
+700 ms

Participant 3:
-600 ms

Participant 4:
+100 ms

The overall mean may appear positive even though participants do not respond consistently.

Therefore, HARMONI should preserve and analyze the distribution of participant-level differences.

---

# 3. Core Principle

A single aggregate value is not sufficient to describe behavioural variation.

The analysis should report:

- central tendency
- dispersion
- direction
- valid participant count
- missing participant count
- minimum
- maximum

---

# 4. Difference Definition

For two conditions A and B:

difference = B - A

Example:

Condition A:
4500 ms

Condition B:
5200 ms

Difference:

5200 - 4500 = +700 ms

A positive value means Condition B produced a larger observed value than Condition A.

---

# 5. Directionality

For latency measures:

Positive difference:
Condition B latency is greater than Condition A.

Negative difference:
Condition B latency is lower than Condition A.

Zero difference:
Both conditions have equal values.

The direction must be documented explicitly.

---

# 6. Why Direction Matters

Consider:

P001:
+500 ms

P002:
-500 ms

The absolute difference for both participants is:

500 ms

but the direction is opposite.

Therefore, absolute difference must not replace signed difference.

---

# 7. Signed Difference

The primary difference representation is:

difference = B - A

Example:

A = 4800 ms
B = 5300 ms

difference = +500 ms

---

# 8. Absolute Difference

An optional secondary measure may be:

absoluteDifference = |B - A|

Example:

A = 4800 ms
B = 5300 ms

absoluteDifference = 500 ms

Absolute difference describes magnitude but removes direction.

Therefore, it should never replace the signed difference.

---

# 9. Difference Distribution

Suppose:

+200
+400
+300
+500
+100

The analysis should retain all participant-level differences.

From this distribution, calculate:

mean difference
median difference
minimum
maximum
standard deviation

---

# 10. Mean Difference

Mean difference:

sum of valid participant differences
-------------------------------------
number of valid participant differences

Example:

200 + 400 + 300 + 500 + 100
= 1500

n = 5

Mean:

300 ms

---

# 11. Median Difference

The median represents the middle participant-level difference after sorting.

Example:

100
200
300
400
500

Median:

300 ms

---

# 12. Variability

Participant-level standard deviation describes how much participants differ from one another in their condition response.

High variability may indicate heterogeneous responses.

Low variability indicates greater consistency.

However, variability alone does not explain why participants differ.

---

# 13. Directional Consistency

Day 36 introduces directional consistency.

For valid participant differences:

positiveCount
negativeCount
zeroCount

Example:

Positive:
8

Negative:
2

Zero:
0

Valid:
10

Positive proportion:

0.80

---

# 14. Positive Difference Proportion

positiveProportion:

positive differences
--------------------
valid differences

Example:

8 / 10 = 0.80

This can be displayed as:

80%

---

# 15. Negative Difference Proportion

negativeProportion:

negative differences
--------------------
valid differences

Example:

2 / 10 = 0.20

---

# 16. Zero Difference Proportion

zeroProportion:

zero differences
-----------------
valid differences

Zero differences should remain separate from positive and negative differences.

---

# 17. Directional Consistency

Directional consistency can be described as:

maximum proportion among:

positive proportion
negative proportion
zero proportion

However, the value should be interpreted descriptively.

It does not establish statistical significance.

---

# 18. Missing Participant Pairs

A participant may have:

Condition A:
valid

Condition B:
missing

The difference is:

null

This participant contributes to:

missingPairCount

but not:

validDifferenceCount

---

# 19. Invalid Differences

If either condition metric is invalid:

difference = null

Do not substitute:

0

---

# 20. Valid Difference Count

Example:

20 participants

18 have valid A/B measurements

2 are missing one condition

Then:

validDifferenceCount = 18

missingDifferenceCount = 2

---

# 21. Participant-Level Sample Size

For difference analysis:

n = number of valid participant-level differences

This is distinct from:

number of trials

and:

number of raw observations

---

# 22. Statistical Unit

The primary unit for Day 36 difference analysis is:

participant

not:

trial.

This is intentional.

---

# 23. Distribution Summary

A difference distribution should contain:

metric

mean

median

minimum

maximum

standardDeviation

validObservationCount

missingObservationCount

positiveCount

negativeCount

zeroCount

---

# 24. Effect-Oriented Descriptive Analysis

Day 36 begins effect-oriented analysis without performing inferential statistics.

The goal is to describe:

How large is the observed difference?

How variable is the difference?

How consistently does the direction occur?

How many participants contributed valid differences?

---

# 25. No Statistical Significance

The following are intentionally excluded:

p-value

confidence interval

hypothesis test

statistical significance

---

# 26. No Causal Claims

If the mean difference is:

+450 ms

the system should report:

"Observed mean difference: +450 ms."

It should not automatically report:

"Condition B causes a 450 ms increase."

---

# 27. Outliers

Participant-level outliers remain visible.

No automatic removal is performed.

For example:

+300
+350
+400
+450
+5000

The +5000 observation remains part of the distribution unless a documented analysis rule later specifies otherwise.

---

# 28. Mean vs Median

If the distribution is skewed:

mean and median may differ substantially.

Example:

100
120
130
150
1000

Mean:

300

Median:

130

Both values are useful because they describe different properties of the distribution.

---

# 29. Standard Deviation

Sample standard deviation should be used when at least two valid participant differences exist.

If:

n < 2

then:

standardDeviation = null

---

# 30. Minimum and Maximum

Minimum and maximum should describe the observed valid participant-level differences.

They should not include:

null

NaN

Infinity

---

# 31. Zero Difference

A zero difference is a valid observation.

Example:

Condition A:
5000 ms

Condition B:
5000 ms

Difference:

0 ms

This participant should count toward:

validDifferenceCount

and:

zeroCount

---

# 32. Negative Differences

Negative differences are valid when the metric itself is valid.

Example:

A:
6000 ms

B:
5500 ms

Difference:

-500 ms

This indicates a lower observed value under Condition B.

---

# 33. Difference Object

Recommended structure:

ParticipantComparison

Fields:

participantId

conditionA

conditionB

metric

conditionAValue

conditionBValue

difference

absoluteDifference

valid

---

# 34. Distribution Object

Recommended structure:

DifferenceDistribution

Fields:

metric

conditionA

conditionB

meanDifference

medianDifference

minimumDifference

maximumDifference

standardDeviation

validParticipantCount

missingParticipantCount

positiveCount

negativeCount

zeroCount

---

# 35. Analytical Pipeline

TrialAnalysis[]
       ↓
Participant × Condition
       ↓
Participant Comparison
       ↓
Valid Difference Extraction
       ↓
Distribution Summary
