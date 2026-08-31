HARMONI

A Transparent Analytical Interface for Participant-Level Human Factors Experimentation

HARMONI is an independent research-oriented analytical interface designed to explore how human factors and experimental interaction data can be transformed into transparent, participant-level evidence.

The central design question is:

«How can an analytical interface communicate experimental differences without hiding participant-level variation or overstating what the data can establish?»

---

Why HARMONI?

Experimental datasets often contain several analytical layers:

Raw Events
    ↓
Trials
    ↓
Participants
    ↓
Conditions
    ↓
Differences
    ↓
Effect Magnitude
    ↓
Robustness
    ↓
Interpretation

As data moves upward through these layers, useful information can become hidden.

HARMONI therefore keeps participant-level evidence connected to aggregate analytical results.

---

Core Features

Participant-Level Analysis

Condition comparisons preserve within-participant pairing.

For each participant:

Difference = Condition B − Condition A

This produces a participant-level difference distribution.

---

Descriptive Statistics

The interface provides:

- mean difference
- median difference
- standard deviation
- minimum
- maximum
- valid participant count
- missing participant count

---

Standardized Effect

HARMONI calculates a paired standardized effect based on the mean participant difference and the standard deviation of participant differences.

Standardized Effect
=
Mean Participant Difference
/
SD of Participant Differences

The standardized effect is presented as a descriptive magnitude measure.

It is not treated as statistical significance.

---

Robustness Diagnostics

The system provides descriptive quality-control information including:

- completeness
- missingness
- directional consistency
- mean-median comparison
- potential extreme observations
- sensitivity summaries

Potential extreme observations are flagged for diagnostic review rather than automatically removed.

---

Controlled Interpretation

Interpretation is generated using deterministic analytical templates.

This approach prioritizes:

- reproducibility
- auditability
- consistency
- scientific restraint

The system avoids automatically converting descriptive differences into causal or significance claims.

---

Research Integrity

HARMONI explicitly separates:

Observed Difference
        ↓
Effect Magnitude
        ↓
Robustness Diagnostics
        ↓
Interpretation

from:

Statistical Inference
        ↓
Causal Explanation

The current system is primarily descriptive.

Effect magnitude alone does not establish statistical significance, causality, or practical importance.

---

Analytical Architecture

Data Ingestion
      ↓
Validation
      ↓
Trial Analysis
      ↓
Participant Summary
      ↓
Condition Comparison
      ↓
Participant Difference
      ↓
Effect Analysis
      ↓
Robustness Analysis
      ↓
Interpretation
      ↓
Research Dashboard

---

Technology

HARMONI is implemented using the technologies documented in the repository.

The implementation emphasizes:

- TypeScript
- modular analytical functions
- typed analytical objects
- deterministic calculations
- component-based interface design
- automated testing

Only technologies actually used by the implementation are listed here.

---

Project Structure

HARMONI/
│
├── src/
│   ├── analysis/
│   ├── components/
│   ├── data/
│   └── types/
│
├── docs/
│   ├── architecture/
│   ├── research/
│   ├── testing/
│   ├── progress/
│   └── case-study/
│
├── public/
│
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── LICENSE

---

Research-Oriented Design Principles

1. Participant-Level Transparency

Aggregate results should remain connected to individual participant observations.

2. Explicit Missingness

Missing data is represented explicitly rather than converted into zero.

3. Effect ≠ Significance

Standardized effect magnitude is not presented as statistical significance.

4. Diagnostic ≠ Deletion

Potential extreme observations are flagged rather than automatically removed.

5. Deterministic Interpretation

Analytical interpretation is generated from explicit rules rather than unrestricted text generation.

6. Reproducibility

Identical data and configuration should produce identical analytical outputs.

---

Limitations

HARMONI is an independent research-oriented software project and is not intended to replace specialized statistical software.

The current analytical system is primarily descriptive.

Depending on the research question, additional methods may be required, including:

- confidence intervals
- inferential hypothesis tests
- repeated-measures statistical models
- hierarchical models
- Bayesian methods
- longitudinal analysis

The interpretation of a metric also depends on its domain-specific semantics.

---

Future Work

Potential future extensions include:

- formal inferential analysis
- confidence intervals
- Bayesian analysis
- hierarchical modeling
- longitudinal participant analysis
- automated research reports
- experiment configuration management
- usability evaluation
- accessibility evaluation
- larger-scale datasets

---

Portfolio Case Study

The complete case study documents:

1. Context
2. Problem
3. Research Question
4. Design Goals
5. Data Model
6. Analytical Pipeline
7. Participant-Level Analysis
8. Effect Analysis
9. Robustness
10. Interface Design
11. Validation
12. Limitations
13. Future Work
14. Reflection

---

Project Status

Version:

"1.0.0"

Development cycle:

"42 days"

Status:

"Portfolio-ready pending final validation"

---

Final Statement

HARMONI explores a simple but important principle:

«The path from observation to interpretation should remain visible.»

Rather than presenting an aggregate result as an isolated number, the system connects the result back to participant-level evidence, variability, effect magnitude, robustness diagnostics, and methodological limitations.
