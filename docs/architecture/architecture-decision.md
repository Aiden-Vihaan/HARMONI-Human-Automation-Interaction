## Architecture Decision Record

**ADR:** 001
**Title:** Separate Experimental Logic from Interface Rendering
**Status:** Accepted
**Date:** Day 15

---

# Context

HARMONI is an experimental Human-Automation Interaction prototype.

The system must support controlled manipulation of communication conditions while recording reliable behavioural data.

If experimental logic is embedded directly inside UI components, later changes could unintentionally alter experimental behaviour.

---

# Decision

The prototype will separate:

1. Scenario management
2. Trial state management
3. Automation behaviour
4. Communication rendering
5. Participant interaction
6. Event logging
7. Data persistence

---

# Proposed Architecture

                 ┌──────────────────┐
                 │ Scenario Manager │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │  Trial State     │
                 │     Machine      │
                 └────────┬─────────┘
                          ↓
              ┌───────────┴───────────┐
              ↓                       ↓
   ┌──────────────────┐    ┌──────────────────┐
   │ Automation       │    │ Environment      │
   │ Controller       │    │ Engine           │
   └────────┬─────────┘    └────────┬─────────┘
            └───────────┬───────────┘
                        ↓
              ┌────────────────────┐
              │ Communication      │
              │ Renderer           │
              └─────────┬──────────┘
                        ↓
              ┌────────────────────┐
              │ Interaction       │
              │ Handler           │
              └─────────┬──────────┘
                        ↓
              ┌────────────────────┐
              │ Event Logger       │
              └─────────┬──────────┘
                        ↓
              ┌────────────────────┐
              │ Experimental Data  │
              └────────────────────┘
