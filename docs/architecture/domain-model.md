# HARMONI — Day 17
## Domain Model and Experimental Data Contracts

**Project:** HARMONI
**Phase:** Core Engineering
**Day:** 17
**Status:** Domain Model Defined

---

# 1. Purpose

Day 17 defines the formal domain model for HARMONI.

The domain model establishes the vocabulary and data contracts used throughout the application.

The purpose is to ensure that:

- Experimental conditions are represented consistently.
- Scenario configuration is strongly typed.
- Trial state is explicit.
- Events are traceable.
- Participant actions are distinguishable from system events.
- Assessment responses are structured.
- Experimental outcomes can be reconstructed from raw data.

The domain model is independent of the visual interface.

---

# 2. Domain Entities

HARMONI contains the following primary entities:

Participant
Session
Scenario
Condition
Trial
Event
Assessment
AssessmentResponse
ParticipantAction
TrialOutcome
