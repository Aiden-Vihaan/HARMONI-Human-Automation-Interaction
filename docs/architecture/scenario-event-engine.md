# HARMONI — Day 26
## Deterministic Scenario Event Engine

Project: HARMONI
Phase: Experimental Control
Day: 26
Status: In Progress

---

# 1. Purpose

Day 26 introduces the deterministic scenario event engine.

The purpose is to provide a controlled mechanism for changing the experimental environment during a trial.

The system must be capable of representing events such as:

- Automation-state changes
- Environmental changes
- Hazard introduction
- Intervention requests
- Scenario completion

without embedding experimental timing logic inside React components.

---

# 2. Core Principle

The participant interface displays the current experimental state.

It does not decide when an experimental event occurs.

Therefore:

Scenario Configuration
        |
        v
Scenario Event Engine
        |
        v
Trial State
        |
        v
Presentation Adapter
        |
        v
Participant Environment
