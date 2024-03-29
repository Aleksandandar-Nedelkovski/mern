import {
  CREATE_GROUP,
  CLEAR_SUCCESS,
  GROUP_CREATE_FAIL,
  CLEAR_ERRORS,
  LOGOUT,
  GROUPS_LOADED,
  GROUPS_FAIL,
  GROUPS_CLEAR_SEARCH,
  GROUPS_CLEAR_FILTER,
  GROUPS_FILTER_SEARCH,
  GROUPS_FILTER_COURSE,
  GROUPS_SET_CURRENT,
  SEND_JOIN_REQUEST,
  CLEAR_PROMPTS,
  GROUPS_USER_LOADED,
} from "../actions/types";

const initialState = {
  current: null,
  creation_error: null,
  creation_success: false,
  groups_loaded: false,
  user_groups: [],
  groups: [],
  filtered: [],
  cancel_search: false,
  user_groups_loading: true,
  loading: true,
  error: null,
  prompt: null,
};

function groupReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_GROUP:
      return {
        ...state,
        current: payload,
        creation_success: true,
        creation_error: null,
      };

    case GROUP_CREATE_FAIL:
      return {
        ...state,
        current: null,
        creation_error: payload,
      };

    case GROUPS_LOADED:
      return {
        ...state,
        groups: payload,
        loading: false,
      };

    case GROUPS_FILTER_COURSE:
      return {
        ...state,
        cancel_search: true,
        filtered: payload,
      };

    case GROUPS_FILTER_SEARCH:
      return {
        ...state,
        filtered: state.groups
          .filter((group) => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return group.name.match(regex);
          })
          .map((group) => {
            return { ...group, view: "normal" };
          }),
      };

    case GROUPS_USER_LOADED:
      return {
        ...state,
        user_groups: payload,
        user_groups_loading: false,
      };

    case GROUPS_CLEAR_SEARCH:
      return {
        ...state,
        cancel_search: false,
      };

    case GROUPS_CLEAR_FILTER:
      return {
        ...state,
        cancel_search: true,
        filtered: [],
      };

    case SEND_JOIN_REQUEST:
      return {
        ...state,
        prompt: payload.msg,
      };

    case GROUPS_SET_CURRENT:
      return {
        ...state,
        current: payload,
      };

    case GROUPS_FAIL:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        creation_success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        creation_error: null,
      };

    case CLEAR_PROMPTS:
      return {
        ...state,
        prompt: null,
      };

    case LOGOUT:
      return {
        ...state,
        current: null,
        creation_error: null,
        creation_success: false,
        groups_loaded: false,
        user_groups: [],
        groups: [],
        filtered: [],
        cancel_search: false,
        user_groups_loading: true,
        loading: true,
        error: null,
        prompt: null,
      };
    default:
      return state;
  }
}

export default groupReducer;
