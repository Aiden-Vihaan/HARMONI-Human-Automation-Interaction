## Experimental Design Refinement and Pilot Architecture
**Status:** Design Refinement Complete

---

## 1. Purpose

Day 14 focuses on critically reviewing the experimental protocol before implementation.

The objective is to ensure that the experiment measures the intended construct:

> The effect of automation communication richness on human Situation Awareness, mental workload, and intervention performance.

The protocol was reviewed for potential confounding variables, unnecessary complexity, and weaknesses in measurement.

---

## 2. Methodological Audit

The initial experimental concept contained four communication conditions:

1. Minimal information
2. Context information
3. Explanation
4. Explanation + action guidance

During methodological review, the fourth condition was identified as a potential confound.

Adding wording such as:

> TAKE CONTROL NOW

does not only increase information.

It can also increase:

- Perceived urgency
- Time pressure
- Arousal
- Response pressure
- Decision speed

Therefore, the fourth condition could not be interpreted as a pure manipulation of communication richness.

The condition was removed from the primary experiment.

---

## 3. Revised Experimental Conditions

The primary experiment will use three communication conditions.

### C1 — STATE ONLY

AUTOMATION LIMITED

TAKE CONTROL

Information provided:

- System state: Yes
- Context: No
- Reason: No

---

### C2 — STATE + CONTEXT

AUTOMATION LIMITED

OBSTACLE DETECTED AHEAD

TAKE CONTROL

Information provided:

- System state: Yes
- Context: Yes
- Reason: No

---

### C3 — STATE + CONTEXT + REASON

AUTOMATION LIMITED

OBSTACLE DETECTED AHEAD

AUTOMATED CONTROL IS CURRENTLY
UNABLE TO MANAGE THIS SITUATION

TAKE CONTROL

Information provided:

- System state: Yes
- Context: Yes
- Reason: Yes

---

## 4. Experimental Manipulation

The independent manipulation is:

> Communication Information Richness

The experiment will progressively add information:

C1 → State

C2 → State + Context

C3 → State + Context + Reason

The experiment will NOT intentionally manipulate:

- Urgency
- Action requirement
- Display position
- Visual salience
- Timing
- Interaction mechanism
- Scenario difficulty

---

## 5. Constant Action Instruction

The action instruction remains identical across all conditions:

TAKE CONTROL

This prevents action wording from becoming an additional independent variable.

---

## 6. Controlled Interface Variables

The following properties must remain identical across conditions:

- Display position
- Font family
- Font size
- Typography
- Colour
- Iconography
- Button placement
- Button appearance
- Animation
- Alert onset
- Response mechanism
- Scenario
- Background environment

Only the information content should change.

---

## 7. Information Hierarchy

The communication structure consists of three information layers.

### Layer 1 — State

What is happening to the automation?

AUTOMATION LIMITED

### Layer 2 — Context

What relevant situation is occurring?

OBSTACLE DETECTED AHEAD

### Layer 3 — Reason

Why is the automation unable to continue?

AUTOMATED CONTROL IS CURRENTLY
UNABLE TO MANAGE THIS SITUATION

---

## 8. Conceptual Information Model

AUTOMATION EVENT
        ↓
SYSTEM STATE
        ↓
ENVIRONMENTAL CONTEXT
        ↓
AUTOMATION REASON
        ↓
HUMAN INTERPRETATION
        ↓
SITUATION AWARENESS
        ↓
DECISION
        ↓
INTERVENTION
        ↓
OUTCOME

---

## 9. Research Logic

The experiment does not assume:

More information = Better performance

The experiment also does not assume:

Less information = Lower workload = Better performance

Instead, the experiment allows several possible outcomes.

### Outcome A — Information Benefit

Information increases Situation Awareness without substantially increasing workload.

### Outcome B — Cognitive Cost

Information increases Situation Awareness but also increases workload.

### Outcome C — Information Overload

Additional information increases workload enough to impair intervention performance.

### Outcome D — Diminishing Returns

The first additional information layer produces a meaningful benefit, while subsequent information produces little additional benefit.

---

## 10. Primary Research Interest

The central Human Factors question is:

> At what point does the benefit of additional automation information begin to be offset by the cognitive cost of processing that information?

This creates a measurable trade-off between:

- Situation Awareness
- Mental workload
- Decision quality
- Intervention performance

---

## 11. Research Model

COMMUNICATION RICHNESS
        ↓
INFORMATION CONTENT
        ↓
 ┌──────┴──────┐
 ↓             ↓
SITUATION      WORKLOAD
AWARENESS
 ↓             ↓
 └──────┬──────┘
        ↓
     DECISION
        ↓
   INTERVENTION
        ↓
      OUTCOME

Trust and automation reliance will be treated as secondary exploratory variables.

---

## 12. Scenario Requirement

The scenario must create a genuine need for Situation Awareness.

Participants should not be able to succeed simply by memorising:

> "Whenever this message appears, click the button."

The participant must understand the developing situation.

The scenario therefore needs:

- Environmental information
- A developing event
- Automation behaviour
- An automation limitation
- A human intervention requirement

---

## 13. Trial Structure

Each trial should follow this structure:

BASELINE
    ↓
AUTOMATED OPERATION
    ↓
ENVIRONMENTAL DEVELOPMENT
    ↓
EMERGING EVENT
    ↓
AUTOMATION LIMITATION
    ↓
COMMUNICATION
    ↓
HUMAN INTERPRETATION
    ↓
INTERVENTION
    ↓
SITUATION AWARENESS ASSESSMENT
    ↓
WORKLOAD ASSESSMENT

---

## 14. Situation Awareness Measurement

Situation Awareness should not be inferred from reaction time alone.

Fast reaction does not necessarily indicate good Situation Awareness.

A participant could react quickly without correctly understanding:

- Current system state
- Environmental situation
- Cause of automation limitation
- Likely next event

Therefore, explicit Situation Awareness assessment will be included.

---

## 15. Situation Awareness Levels

The assessment will represent three levels of Situation Awareness.

### Level 1 — Perception

What is currently happening?

Example:

What caused the automation limitation?

---

### Level 2 — Comprehension

What does the current situation mean?

Example:

Why is the automated system unable to continue?

---

### Level 3 — Projection

What is likely to happen next?

Example:

What is the most likely immediate consequence if manual control is not resumed?

---

## 16. Question Design Principle

Situation Awareness questions should evaluate understanding rather than simple text recall.

Weak question:

What did the message say?

Stronger question:

What situation is the automation currently unable to handle?

The second question provides a better indication of comprehension.

---

## 17. Workload Measurement

Mental workload will remain one of the primary dependent variables.

NASA-TLX is currently selected as the workload measurement instrument.

The same measurement procedure must be used across all experimental conditions.

The measurement procedure should not be modified between conditions.

---

## 18. Behavioural Measures

The prototype will automatically record:

- Trial identifier
- Experimental condition
- Event timestamp
- Communication timestamp
- Response timestamp
- Reaction time
- Participant decision
- Decision correctness
- Intervention type

---

## 19. Reaction Time

Reaction time will not be interpreted as a standalone measure of interface quality.

A faster response may result from:

- Better Situation Awareness
- Lower decision complexity
- Higher perceived urgency
- Guessing
- Prior learning
- Memorisation

Therefore, reaction time will be interpreted together with:

- Decision accuracy
- Situation Awareness
- Workload

---

## 20. Intervention Quality

The preferred behavioural outcome is:

> Appropriate + accurate + sufficiently fast intervention.

The objective is not simply to minimise reaction time.

---

## 21. Trust

Trust in automation will be treated as a secondary exploratory measure.

High trust is not automatically desirable.

Appropriate trust means that the participant's reliance is calibrated to the system's actual capabilities.

The experiment should therefore distinguish between:

- Trust
- Reliance
- Performance

---

## 22. Timing Control

Communication timing must remain identical across experimental conditions.

The following sequence should be controlled:

SCENARIO ONSET
        ↓
CRITICAL EVENT
        ↓
COMMUNICATION ONSET
        ↓
RESPONSE WINDOW

Only communication information content should vary.

---

## 23. Manipulation Check

A manipulation check may ask participants:

> How much information did the system provide about the situation?

Response scale:

1 — Very little
2 — Little
3 — Moderate
4 — High
5 — Very high

This is used to verify whether participants perceived the intended information difference.

It is not a primary outcome variable.

---

## 24. Pilot Study

The pilot study will evaluate the experimental procedure before the main study.

The pilot is intended to identify:

- Technical problems
- Confusing instructions
- Weak manipulation
- Poor question design
- Timing problems
- Ceiling effects
- Floor effects
- Learning effects
- Data logging errors

---

## 25. Pilot Success Criteria

The prototype should satisfy the following criteria:

### Technical

- No critical crashes
- Accurate timestamps
- Correct condition assignment
- Complete event logging
- Reliable response recording

### Human Factors

- Participants understand the task
- Participants understand the intervention
- Participants can distinguish the communication conditions
- Situation Awareness questions are understandable
- Workload assessment is practical

---

## 26. Pilot Failure Criteria

The protocol requires revision if:

- Participants misunderstand the task.
- Participants cannot distinguish communication conditions.
- Participants answer SA questions through message memorisation alone.
- One condition creates unintended urgency.
- Timing is unreliable.
- Performance reaches a strong ceiling.
- Performance reaches a strong floor.
- Participants cannot complete the task consistently.

---

## 27. Research Integrity

Pilot results will not be used to manufacture supportive findings.

Pilot data will be used to improve:

- Experimental validity
- Usability
- Technical reliability
- Measurement quality

Any methodological changes resulting from pilot testing must be documented.

---

## 28. Version History

v1.0 — Initial experimental design

v1.1 — Identified urgency confound

v1.2 — Reduced primary manipulation to three conditions

v1.3 — Refined Situation Awareness measurement

v1.4 — Added pilot validation framework

---

## 29. Final Experimental Design

The primary experiment will use:

C1 — STATE ONLY

C2 — STATE + CONTEXT

C3 — STATE + CONTEXT + REASON

The action instruction remains constant:

TAKE CONTROL

---

## 30. Day 14 Conclusion

The experimental protocol has been refined to isolate communication information richness more clearly.

The project will now progress from methodological design toward scenario engineering and prototype implementation.

---

## 31. Next Step

Day 15 will define:

- Scenario architecture
- Scenario storyboard
- Trial state machine
- Interface states
- Event definitions
- Timing specification
- Prototype behaviour
