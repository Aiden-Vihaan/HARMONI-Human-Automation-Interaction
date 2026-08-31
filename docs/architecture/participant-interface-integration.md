# HARMONI — Day 29
## Participant Interface Integration & Intervention Presentation

Project: HARMONI
Phase: Human-System Interaction
Day: 29
Status: In Progress

---

# 1. Purpose

Day 29 integrates the intervention communication layer with the participant-facing interface.

The objective is to create a clear separation between:

1. Experimental state
2. Intervention communication state
3. Participant-facing presentation
4. Participant action
5. Event logging

The interface should represent the current experimental state without becoming the source of experimental truth.

---

# 2. Core Principle

The participant interface is a presentation and interaction layer.

It must not independently determine:

- Scenario time
- Experimental phase
- Intervention timing
- Automation state
- Hazard state
- Trial completion

These values originate from the experimental state model.

---

# 3. Updated Architecture

```text
ScenarioDefinition
        |
        v
ScenarioEventEngine
        |
        v
TrialRuntime
        |
        v
TrialController
        |
        v
TrialState
        |
        +--------------------+
        |                    |
        v                    v
Intervention          Environment State
Communication
        |
        v
Presentation Adapter
        |
        v
Participant Interface
        |
        v
Participant Action
        |
        v
TrialController
        |
        v
Event Logger
