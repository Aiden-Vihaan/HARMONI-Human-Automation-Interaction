# HARMONI — Day 24## Participant Environment Foundation

Project: HARMONI
Phase: Participant Interaction Layer
Day: 24
Status: Environment Foundation Implemented

---

# 1. Purpose

Day 24 begins implementation of the participant-facing environment.

The objective is to create a realistic interactive environment in which a participant can observe a simulated operational situation and eventually respond to an automation-related event.

The environment is intentionally separated from the experimental engine.

The experimental engine determines:

- Scenario state
- Experimental timing
- Condition
- Events
- Trial progression

The participant environment determines:

- What the participant sees
- What visual elements are rendered
- How the participant interacts with the environment
- How environmental state is visually represented

---

# 2. Architectural Boundary

The system is divided into two major layers.

```text
EXPERIMENTAL LAYER
------------------

Scenario
Timing
State Machine
Condition
Trial Control
Event Logging


PARTICIPANT LAYER
-----------------

Environment
Visualisation
Interaction
Communication UI
Controls
Assessment UI
