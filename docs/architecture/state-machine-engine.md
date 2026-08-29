# HARMONI — Day 18
## Finite-State Machine Engine

**Project:** HARMONI
**Phase:** Core Engineering
**Day:** 18
**Status:** State Machine Engine Implemented

---

# 1. Purpose

Day 18 implements the core finite-state machine responsible for controlling the HARMONI trial lifecycle.

The state machine is the authoritative controller of experimental progression.

The user interface must not independently decide which experimental phase is active.

---

# 2. Why a State Machine?

A research experiment contains a predefined sequence of states.

For HARMONI:

INITIALISING
      ↓
AUTONOMOUS
      ↓
ENVIRONMENT_DEVELOPING
      ↓
CRITICAL_EVENT
      ↓
COMMUNICATION
      ↓
WAITING_FOR_ACTION
      ↓
INTERVENTION
      ↓
OUTCOME
      ↓
SA_ASSESSMENT
      ↓
WORKLOAD
      ↓
TRIAL_COMPLETE
