# HARMONI — Human–Automation Interaction for Safer and More Explainable Driving

> An experimental Human Factors project investigating how explainable automation feedback influences situation awareness, trust, workload, and intervention behaviour during Level-2 automated-driving scenarios.

---

## Overview

HARMONI is a research-oriented Human–Machine Interaction project focused on the relationship between automated systems and their human operators.

The project investigates whether contextual and explainable feedback about an automated-driving system's current state, capabilities, limitations, and required actions can improve human understanding and intervention behaviour.

Rather than developing an autonomous-driving algorithm, HARMONI focuses on the Human Factors surrounding interaction with automation.

---

## Research Problem

As automated-driving systems become increasingly capable, drivers may not always maintain an accurate understanding of what the automation is doing or what it is capable of handling.

Interfaces that communicate only a warning or system state may provide insufficient context during situations where human intervention is required.

HARMONI investigates whether contextual and explainable automation feedback can support more appropriate human interaction with automated systems.

---

## Primary Research Question

**How does explainable automation feedback influence driver situation awareness and intervention behaviour during Level-2 automated-driving scenarios?**

---

## Secondary Research Questions

1. Does explainable automation feedback improve users' understanding of the current state and limitations of automated driving?

2. How does explainable automation feedback influence driver trust and confidence in the automated system?

3. How does explainable automation feedback influence perceived mental workload during automation-critical situations?

4. Does explainable automation feedback affect the speed and accuracy of driver intervention?

---

## Initial Hypotheses

### H1 — Situation Awareness

Participants exposed to explainable automation feedback will demonstrate higher situation-awareness scores than participants exposed to conventional feedback.

### H2 — Intervention Behaviour

Participants exposed to explainable automation feedback will demonstrate faster and/or more accurate responses during automation-critical scenarios.

### H3 — Trust

Explainable automation feedback will influence users' trust in automation by providing greater transparency regarding system capabilities and limitations.

### H4 — Workload

Explainable automation feedback will affect perceived workload during critical automation scenarios.

> The direction and magnitude of these effects will be determined empirically rather than assumed in advance.

---

## Experimental Concept

HARMONI will compare two interface conditions.

### Condition A — Conventional Feedback

A minimal automation interface communicating system status and intervention warnings.

Example:

> ⚠ TAKE CONTROL

### Condition B — Explainable Feedback

A contextual interface communicating system state, detected conditions, automation limitations, and recommended human action.

Example:

> **AUTOMATION LIMITATION**
>
> Pedestrian detected ahead.
>
> Automated braking unavailable.
>
> **Driver intervention required.**

The two conditions will be evaluated using controlled automated-driving scenarios.

---

## Planned Human Factors Measures

### Behavioural Measures

- Reaction time
- Decision accuracy
- Intervention success
- Error rate

### Subjective Measures

- Situation awareness
- Trust in automation
- Perceived workload
- Confidence
- Perceived safety

---

## Research Areas

- Human–Automation Interaction
- Human–Machine Interaction
- Human Factors
- Situation Awareness
- Trust in Automation
- Mental Workload
- Explainable Automation
- Automated Driving
- Human-Centred AI
- Experimental UX Research

---

## Technology

### Interface & Prototype

- React
- TypeScript
- HTML/CSS
- Figma

### Data & Analysis

- Python
- Pandas
- NumPy
- SciPy
- Matplotlib

### Development

- Git
- GitHub

---

## Planned System

The final prototype will contain:

```text
Participant
     │
     ▼
Driving Simulation
     │
     ├── Automation State
     │
     ├── Scenario Engine
     │
     ├── Interface A
     │
     └── Interface B
             │
             ▼
        Event Logger
             │
             ▼
      Experiment Dataset
             │
             ▼
       Statistical Analysis
             │
             ▼
       Human Factors Findings
