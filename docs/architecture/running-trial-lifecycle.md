# HARMONI — Day 27
## Running Trial Lifecycle & Scenario Integration

Project: HARMONI
Phase: Experimental Control Integration
Day: 27
Status: In Progress

---

# 1. Purpose

Day 27 integrates the deterministic ScenarioEventEngine into the running trial lifecycle.

Until Day 26, the scenario engine could independently determine which scheduled events had become eligible.

Day 27 connects that mechanism to an actual running trial.

The objective is to establish a controlled lifecycle:

TRIAL CREATED
      ↓
TRIAL STARTED
      ↓
BASELINE
      ↓
ACTIVE
      ↓
SCENARIO EVENTS
      ↓
INTERVENTION
      ↓
PARTICIPANT RESPONSE
      ↓
TRIAL COMPLETED
