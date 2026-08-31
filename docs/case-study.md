HARMONI

A Transparent Analytical Interface for Participant-Level Human Factors Experimentation

---

Overview

HARMONI is an independent research-oriented software project exploring how human factors and experimental interaction data can be transformed into a transparent, participant-centered analytical interface.

The project focuses on an important analytical challenge:

How can experimental results be communicated clearly while preserving the participant-level evidence behind aggregate findings?

---

The Problem

Human-subject experiments frequently produce multiple analytical layers.

At the lowest level are individual observations.

These observations are aggregated into trials, participants, conditions, and experiment-level summaries.

Each aggregation step can make the data easier to understand, but it can also hide variation.

A single mean difference may therefore provide an incomplete representation of the underlying participant behavior.

---

Design Question

HARMONI asks:

How might an analytical interface preserve the connection between aggregate experimental findings and the participant-level observations that produced them?

---

Approach

The system was designed around an explicit analytical pipeline:

Raw Events

↓

Trial-Level Analysis

↓

Participant-Level Summary

↓

Condition Comparison

↓

Participant Difference

↓

Effect Magnitude

↓

Robustness Diagnostics

↓

Research Interpretation

---

Key Design Principle

The project treats transparency as a first-class analytical requirement.

A researcher should be able to move from an aggregate result back toward the participant-level evidence underlying that result.

---

Participant-Level Analysis

For repeated-measures comparisons, participant-level pairing is preserved.

For each participant:

Difference = Condition B − Condition A

This allows the interface to display the distribution of within-participant differences.

---

Effect Analysis

HARMONI additionally calculates a paired standardized effect based on:

Mean participant difference

divided by:

Standard deviation of participant differences.

The standardized effect is treated as a descriptive magnitude measure.

It is not presented as statistical significance.

---

Robustness

The project includes descriptive robustness diagnostics.

These include:

- completeness,
- missing paired observations,
- mean-median comparison,
- directional consistency,
- potential extreme observations,
- sensitivity summaries.

---

Extreme Observations

Potentially extreme observations are flagged for diagnostic review.

They are not automatically removed.

This prevents the interface from silently altering the primary result.

---

Interpretation

The system uses deterministic interpretation templates.

This was deliberately chosen over unrestricted generative interpretation.

The purpose is to improve:

reproducibility

auditability

and:

scientific restraint.

---

Example Analytical Narrative

Condition B showed a higher observed metric than Condition A in the analyzed dataset.

The mean participant-level difference was:

+420 ms

The median difference was:

+390 ms

The standardized effect was:

+1.25

The analysis included:

18 valid participant pairs

and:

2 missing pairs.

---

Interpretation Boundary

These results are descriptive.

Effect magnitude alone does not establish:

statistical significance

causality

or:

practical importance.

---

Limitations

HARMONI is an analytical interface rather than a complete statistical inference framework.

Future versions could incorporate:

confidence intervals

formal repeated-measures tests

hierarchical models

Bayesian approaches

longitudinal models

and:

domain-specific inferential methods.

---

Outcome

The final system demonstrates how an HCI-oriented analytical interface can connect:

participant evidence

descriptive statistics

effect magnitude

robustness diagnostics

and:

responsible interpretation.

---

Project Positioning

HARMONI is an independent portfolio project.

It is not presented as an official tool of any university, laboratory, or research group.

Its purpose is to demonstrate independent work in:

human-computer interaction

human factors

experimental analysis

data visualization

research-oriented software engineering

and:

responsible analytical communication.
