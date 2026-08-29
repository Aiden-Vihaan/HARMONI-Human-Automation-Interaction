## Architecture Decision Record

**ADR:** 002
**Title:** Adopt a Configuration-Driven Experimental Architecture
**Status:** Accepted
**Date:** Day 16

---

# Context

HARMONI requires multiple experimental scenarios and communication conditions.

Hard-coding scenario behaviour directly into interface components would make the prototype difficult to test, reproduce, and extend.

The system also requires reliable behavioural event logging.

---

# Problem

A tightly coupled architecture could produce:

- Difficult-to-test experimental logic
- Hidden dependencies
- Inconsistent timing
- Difficult condition changes
- Poor reproducibility
- Fragile scenario modifications
- Unreliable event logging

---

# Decision

HARMONI will use a modular architecture in which:

1. Scenario parameters are configuration-driven.
2. Trial progression is controlled by a finite-state machine.
3. UI components are responsible primarily for presentation.
4. Experimental logic remains framework-independent.
5. Event logging is handled by a dedicated module.
6. Raw events are retained.
7. Derived metrics are calculated separately.

---

# Architectural Boundary

PRESENTATION
     ↓
APPLICATION
     ↓
EXPERIMENT DOMAIN
     ↓
DATA / LOGGING
