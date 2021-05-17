import {
  GET_EVENTS_FAIL,
  GET_EVENTS,
  GET_EVENT,
  UPDATE_EVENT,
} from "../actions/types";

const INIT_STATE = {
  events: null,
  event: null,
  loading: true,
};

const eventReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        event: null,
        loading: false,
      };
    case UPDATE_EVENT:
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        events: null,
        loading: false,
      };
    case GET_EVENTS_FAIL:
      return {
        ...state,
        events: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default eventReducer;
