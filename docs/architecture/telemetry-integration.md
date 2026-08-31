# HARMONI — Day 31
## Telemetry Integration with Trial Execution

Project: HARMONI
Phase: Experimental Infrastructure
Day: 31
Status: In Progress

---

# 1. Purpose

Day 31 connects the unified telemetry infrastructure to the actual experimental execution layer.

Until Day 30, HARMONI had:

- Trial execution logic
- Intervention communication logic
- Participant interaction logic
- Event logging infrastructure

Day 31 connects these components.

The objective is to ensure that important experimental events are automatically recorded as they occur.

---

# 2. Core Principle

The experiment should generate telemetry naturally as part of execution.

The desired architecture is:

```text
Experimental Action
        |
        v
Domain Logic
        |
        v
State Transition
        |
        v
Telemetry Event
        |
        v
Event Logger
