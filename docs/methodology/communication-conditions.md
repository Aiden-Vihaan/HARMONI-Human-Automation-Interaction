# HARMONI Communication Conditions

## Purpose

This document defines the communication hierarchy used in the HARMONI experiment.

---

# C1 — STATE ONLY

## Message

AUTOMATION LIMITED

TAKE CONTROL

## Information Layers

State: YES
Context: NO
Reason: NO

## Purpose

Provide the minimum information required to communicate that the automation is limited and human intervention is required.

---

# C2 — STATE + CONTEXT

## Message

AUTOMATION LIMITED

OBSTACLE DETECTED AHEAD

TAKE CONTROL

## Information Layers

State: YES
Context: YES
Reason: NO

## Purpose

Provide the automation state together with relevant environmental context.

---

# C3 — STATE + CONTEXT + REASON

## Message

AUTOMATION LIMITED

OBSTACLE DETECTED AHEAD

AUTOMATED CONTROL IS CURRENTLY
UNABLE TO MANAGE THIS SITUATION

TAKE CONTROL

## Information Layers

State: YES
Context: YES
Reason: YES

## Purpose

Provide the automation state, environmental context, and reason for the automation limitation.

---

# Controlled Variables

The following must remain constant:

- Action instruction
- Display location
- Typography
- Font size
- Colour
- Iconography
- Animation
- Alert timing
- Scenario
- Interaction mechanism
- Response window

---

# Independent Variable

Communication Information Richness

---

# Information Progression

C1
STATE
        ↓
C2
STATE + CONTEXT
        ↓
C3
STATE + CONTEXT + REASON

---

# Important Constraint

The experimental manipulation must not intentionally alter:

- Urgency
- Time pressure
- Action requirement
- Visual salience
- Timing

The purpose is to isolate information content as much as practically possible.
