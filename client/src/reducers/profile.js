import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  BUDDY_REQUEST_SENT,
  PROFILE_NOT_EXISTS,
  CLEAR_NOTIFICATIONS,
  CLEAR_ERRORS,
  CLEAR_PROMPTS,
  LOGOUT,
  PROFILE_RECIEVE_NOTIFICATION,
  PROFILE_USER_LOADED,
  PROFILE_USER_SUCCESS,
  INITIATE_EDITING,
  PROFILE_USER_FAIL,
} from "../actions/types";

// const initialState = {
//   profile: null,
//   profiles: [],
//   loading: true,
//   error: {},
// };

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case PROFILE_USER_LOADED:
      return {
        ...state,
        profile_exists: true,
        profile: payload,
        loading: false,
      };

    case PROFILE_NOT_EXISTS:
      return {
        ...state,
        profile_exists: false,
        loading: false,
        error: payload,
      };
    case PROFILE_USER_SUCCESS:
      return {
        ...state,
        editing_profile: false,
      };

    case INITIATE_EDITING:
      return {
        ...state,
        editing_profile: true,
      };

    case PROFILE_USER_FAIL:
      return {
        ...state,
        profile_exists: true,
        error: payload,
      };
    case BUDDY_REQUEST_SENT:
      return {
        ...state,
        prompt: payload,
      };
    case PROFILE_RECIEVE_NOTIFICATION:
      return {
        ...state,
        notification: payload,
      };

    case LOGOUT:
      return {
        profile_exists: false,
        editing_profile: false,
        user_profile: null,
        profiles: [],
        loading: true,
        peers_loaded: false,
        error: null,
        notification: null,
        prompt: null,
      };

    case CLEAR_PROMPTS:
      return {
        ...state,
        prompt: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notification: null,
      };

    default:
      return state;
  }
}

export default profileReducer;
