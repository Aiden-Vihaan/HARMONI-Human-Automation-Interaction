# HARMONI — Day 20
## Experimental Data Flow

---

# 1. Runtime Flow

The runtime architecture is:

Participant
    |
    v
Interface
    |
    v
Trial Controller
    |
    +------------------+
    |                  |
    v                  v
State Machine       Event Logger
    |                  |
    |                  |
    +--------+---------+
             |
             v
        Event Stream
             |
             v
       Trial Dataset
