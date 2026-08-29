# HARMONI — Day 20
## State Machine and Event Logger Integration

Project: HARMONI
Phase: Core Engineering
Day: 20
Status: State Machine + Event Logger Integrated

---

# 1. Purpose

Day 20 integrates two previously independent components:

1. Trial State Machine
2. Experimental Event Logger

The state machine controls what happens next.

The event logger records what happened.

Together they create a traceable experimental execution layer.

---

# 2. Architecture

The integration follows:

```text
EXPERIMENT INPUT
       |
       v
+----------------------+
| Trial Controller     |
+----------+-----------+
           |
           v
+----------------------+
| State Machine        |
|                      |
| Current State        |
| Valid Transition     |
| Transition History   |
+----------+-----------+
           |
           | successful transition
           v
+----------------------+
| Event Logger         |
|                      |
| Event ID             |
| Sequence             |
| Timestamp            |
| Metadata             |
+----------+-----------+
           |
           v
     EVENT STREAM
