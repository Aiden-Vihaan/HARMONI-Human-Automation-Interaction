import type {
  InterventionAction,
  InterventionCommunicationState,
  InterventionEpisode,
} from '../types/intervention'

export interface InterventionCommunication {
  getState():
    InterventionEpisode

  request(
    episodeId: string,
    timestampMs: number,
  ): InterventionEpisode

  present(
    timestampMs: number,
  ): InterventionEpisode

  acknowledge(
    timestampMs: number,
  ): InterventionEpisode

  complete(
    timestampMs: number,
  ): InterventionEpisode

  canPerformAction(
    action: InterventionAction,
  ): boolean
}

function isValidTransition(
  current:
    InterventionCommunicationState,
  next:
    InterventionCommunicationState,
): boolean {
  const transitions:
    Record<
      InterventionCommunicationState,
      InterventionCommunicationState[]
    > = {
      IDLE: ['REQUESTED'],

      REQUESTED: ['PRESENTED'],

      PRESENTED: [
        'ACKNOWLEDGED',
        'COMPLETED',
      ],

      ACKNOWLEDGED: [
        'COMPLETED',
      ],

      COMPLETED: [],
    }

  return transitions[
    current
  ].includes(next)
}

export function createInterventionCommunication():
  InterventionCommunication {
  let state:
    InterventionEpisode = {
      interventionEpisodeId:
        '',
      communicationState:
        'IDLE',
      requestedAtMs:
        null,
      presentedAtMs:
        null,
      acknowledgedAtMs:
        null,
      completedAtMs:
        null,
    }

  function transition(
    nextState:
      InterventionCommunicationState,
    timestampMs: number,
  ) {
    if (
      !isValidTransition(
        state.communicationState,
        nextState,
      )
    ) {
      return state
    }

    state = {
      ...state,
      communicationState:
        nextState,
    }

    return state
  }

  return {
    getState() {
      return state
    },

    request(
      episodeId,
      timestampMs,
    ) {
      if (
        !isValidTransition(
          state.communicationState,
          'REQUESTED',
        )
      ) {
        return state
      }

      state = {
        ...state,

        interventionEpisodeId:
          episodeId,

        communicationState:
          'REQUESTED',

        requestedAtMs:
          timestampMs,
      }

      return state
    },

    present(timestampMs) {
      const result =
        transition(
          'PRESENTED',
          timestampMs,
        )

      if (
        result === state &&
        state.communicationState !==
          'PRESENTED'
      ) {
        return state
      }

      state = {
        ...state,
        presentedAtMs:
          timestampMs,
      }

      return state
    },

    acknowledge(
      timestampMs,
    ) {
      if (
        !isValidTransition(
          state.communicationState,
          'ACKNOWLEDGED',
        )
      ) {
        return state
      }

      state = {
        ...state,

        communicationState:
          'ACKNOWLEDGED',

        acknowledgedAtMs:
          timestampMs,
      }

      return state
    },

    complete(timestampMs) {
      if (
        !isValidTransition(
          state.communicationState,
          'COMPLETED',
        )
      ) {
        return state
      }

      state = {
        ...state,

        communicationState:
          'COMPLETED',

        completedAtMs:
          timestampMs,
      }

      return state
    },

    canPerformAction(
      action,
    ) {
      switch (action) {
        case 'ACKNOWLEDGE_INTERVENTION':
          return (
            state.communicationState ===
            'PRESENTED'
          )

        case 'TAKE_CONTROL':
          return (
            state.communicationState ===
              'PRESENTED' ||
            state.communicationState ===
              'ACKNOWLEDGED'
          )

        default:
          return false
      }
    },
  }
}
