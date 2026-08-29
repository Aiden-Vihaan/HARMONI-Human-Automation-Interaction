# HARMONI — Day 19
## Event Logging and Experimental Traceability

Project: HARMONI
Phase: Core Engineering
Day: 19
Status: Event Logging Engine Implemented

---

# 1. Purpose

Day 19 introduces the event logging layer of HARMONI.

The event logger records a chronological stream of events generated during an experimental session.

The objective is to preserve enough information to reconstruct what happened during a trial after the trial has finished.

The logger is designed around the principle:

"Record first, derive later."

Raw experimental events should be preserved independently from derived metrics such as reaction time, performance scores, or workload summaries.

---

# 2. Why Event Logging Matters

A research prototype should not depend solely on the final outcome.

For example:

A participant may successfully intervene.

However, the final outcome alone does not tell us:

- When the critical event occurred.
- When the communication appeared.
- What condition was active.
- When the participant responded.
- How long the participant took to respond.
- Whether an unexpected system event occurred.
- Whether the trial followed the expected state sequence.

Event logging preserves this information.

---

# 3. Event-Sourcing Principle

HARMONI uses a lightweight event-based architecture.

EXPERIMENT
    |
    v
EVENTS
    |
    v
EVENT STREAM
    |
    +----> Trial reconstruction
    |
    +----> Reaction-time calculation
    |
    +----> Behavioural analysis
    |
    +----> Debugging
    |
    +----> Research audit trail
