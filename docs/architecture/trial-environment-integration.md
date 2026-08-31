## Trial Engine ↔️ Participant Environment Integration

Project: HARMONI
Phase: Experimental Integration
Day: 25
Status: In Progress

---

# 1. Purpose

Day 25 integrates the participant-facing environment with the experimental engine.

The objective is to establish a controlled data flow between:

1. Experimental state
2. Trial controller
3. Participant environment
4. Participant action
5. Event logging

The participant interface must not independently determine experimental outcomes.

---

# 2. Core Principle

The experiment controls the environment.

The participant interface represents the environment.

The participant interacts with the interface.

The experimental engine records and evaluates the resulting interaction.

Therefore:

EXPERIMENTAL ENGINE
        |
        v
CURRENT TRIAL STATE
        |
        v
PRESENTATION LAYER
        |
        v
PARTICIPANT ENVIRONMENT
        |
        v
PARTICIPANT ACTION
        |
        v
TRIAL CONTROLLER
        |
        v
EVENT LOGGER
