# HARMONI — Day 17
## Domain Invariants

---

# 1. Purpose

Domain invariants define conditions that must always remain true.

They protect the experimental system from invalid states.

---

# 2. Trial Invariants

A trial must have:

- A unique trial ID.
- A valid session ID.
- A valid scenario ID.
- Exactly one experimental condition.
- A valid current state.

---

# 3. Condition Invariants

A condition must be one of:

```text
STATE_ONLY
STATE_AND_CONTEXT
STATE_CONTEXT_AND_REASON
