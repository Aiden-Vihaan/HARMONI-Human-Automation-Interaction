# HARMONI — Day 32
## Temporal Analysis & Derived Experimental Measures

Project: HARMONI
Phase: Experimental Analytics
Day: 32
Status: In Progress

---

# 1. Purpose

Day 32 introduces the first analytical layer on top of the raw experimental telemetry.

The purpose is to transform an ordered event trace into reproducible temporal measures without modifying the underlying raw events.

The analysis layer answers questions such as:

- How long did the system take to present an intervention?
- How long did the participant take to acknowledge it?
- How long did the participant take to take control?
- Was the intervention completed?
- Were invalid actions observed?
- Is the event sequence internally consistent?

---

# 2. Fundamental Principle

Raw telemetry and derived analysis must remain separate.

The architecture is:

RAW EXPERIMENTAL EVENTS
          |
          v
      ANALYSIS
          |
          v
DERIVED MEASURES
