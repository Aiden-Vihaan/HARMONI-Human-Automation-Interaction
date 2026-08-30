# HARMONI — Day 24
## Participant Component Boundary

---

# 1. ParticipantEnvironment

Responsibility:

Composition of the participant-facing environment.

It does not own experimental timing.

---

# 2. EnvironmentCanvas

Responsibility:

Render the operational environment.

Input:

EnvironmentState

Output:

Visual representation.

---

# 3. EnvironmentObject

Responsibility:

Render one environment object.

The component does not determine:

- Object appearance timing
- Object creation timing
- Scenario transitions

---

# 4. AutomationStatus

Responsibility:

Represent the current automation state.

It receives:

```text
AUTONOMOUS
LIMITED
REQUESTING_INTERVENTION
MANUAL
