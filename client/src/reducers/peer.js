import {
  PEERS_CLEAR_SEARCH,
  PEERS_LOADED,
  PEERS_CLEAR_FILTER,
  PEERS_FAIL,
  PEERS_FILTER_SEARCH,
  PEERS_FILTER_COURSE,
  CLEAR_ERRORS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  peers_loaded: false,
  peers: [],
  current: null,
  filtered: [],
  loading: true,
  error: null,
};

function peerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PEERS_LOADED:
      return {
        ...state,
        peers: payload,
        peers_loaded: true,
        loading: false,
      };

    case PEERS_FAIL:
      return {
        ...state,
        peers_loaded: false,
        error: payload,
      };

    case PEERS_FILTER_COURSE:
      return {
        ...state,
        cancel_search: true,
        filtered: [...payload],
      };

    case PEERS_FILTER_SEARCH:
      return {
        ...state,
        filtered: state.peers
          .filter((peer) => {
            const regex = new RegExp(`${payload}`, "gi");
            return peer.user.name.match(regex);
          })
          .map((peer) => {
            return { ...peer, view: "normal" };
          }),
      };

    case PEERS_CLEAR_FILTER:
      return {
        ...state,
        cancel_search: true,
        filtered: [],
      };

    case PEERS_CLEAR_SEARCH:
      return {
        ...state,
        cancel_search: false,
      };

    case LOGOUT:
      return {
        peers_loaded: false,
        peers: [],
        current: null,
        filtered: [],
        loading: true,
        error: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

export default peerReducer;
