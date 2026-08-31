# HARMONI — Day 30
## Unified Event Logging & Experimental Telemetry

Project: HARMONI
Phase: Experimental Infrastructure
Day: 30
Status: In Progress

---

# 1. Purpose

Day 30 introduces a unified event-logging and telemetry architecture.

The purpose is to record the chronological sequence of observable events occurring during an experimental trial.

The logging system must make it possible to reconstruct what happened during a trial without relying on the current UI state.

---

# 2. Core Principle

The system should record EVENTS rather than repeatedly recording STATE.

State tells us:
What is true now?
