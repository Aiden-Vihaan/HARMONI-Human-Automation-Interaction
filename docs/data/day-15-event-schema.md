## Experimental Event Schema

---

# 1. Purpose

This document defines the minimum event vocabulary required for reliable experimental logging.

The logging system is designed so that every important participant and system event can be reconstructed after a session.

---

# 2. Core Event Fields

Every event should contain:

event_id
participant_id
session_id
trial_id
scenario_id
condition
event_name
timestamp
