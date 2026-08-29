# HARMONI — Day 21
## Deterministic Scenario and Timing Engine

Project: HARMONI
Phase: Experimental Engine
Day: 21
Status: Scenario Timing Architecture Defined

---

# 1. Purpose

Day 21 introduces the deterministic scenario and timing engine.

The purpose of this component is to control when experimental events occur.

The scenario engine is responsible for coordinating:

- Baseline exposure
- Environmental development
- Critical event triggering
- Communication timing
- Participant response windows
- Trial termination
- Scenario reset

The engine must remain independent from React and visual presentation.

---

# 2. Why Deterministic Timing Matters

Timing is a critical part of an interactive experiment.

If an event occurs at a different point during every execution because of rendering delays, uncontrolled timers, or UI state, then trials may become difficult to compare.

HARMONI therefore separates:

EXPERIMENTAL TIME
from
RENDERING TIME
