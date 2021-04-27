import api from "../utils/api";
import { setAlert } from "./alert";
// import groupsReducer from "../reducers/group";

import {
  GROUPS_LOADED,
  GROUPS_FAIL,
  CREATE_GROUP,
  GROUP_CREATE_FAIL,
  GROUPS_FILTER_COURSE,
  GROUPS_SET_CURRENT,
  GROUPS_USER_LOADED,
  // USER_LOADED,
  // AUTH_ERROR,
  // CREATE_GROUP,
  // GROUP_CREATE_FAIL,
  // CLEAR_ERRORS,
  // LOGOUT,
  // GROUPS_CLEAR_SEARCH,
  // GROUPS_CLEAR_FILTER,
  // GROUPS_FILTER_SEARCH,
  // GROUPS_FILTER_CURRENT,
  // CLEAR_SUCCESS,
  // SEND_JOIN_REQUEST,
  // CLEAR_PROMPTS,
  // GET_GROUP,
  // GROUP_ERROR,
} from "./types";

// Load Groups
export const loadGroups = () => async (dispatch) => {
  try {
    const res = await api.get("/groups/byCourse");
    let groups = res.data.map((group) => ({
      ...group,
      view: "normal",
    }));
    dispatch({
      type: GROUPS_LOADED,
      payload: groups,
      // payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUPS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update group
export const uploadGroup = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/groups", formData);

    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
    dispatch(setAlert("Group Created", "success"));
  } catch (err) {
    dispatch({
      type: GROUP_CREATE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Change View State
export const changeView = (id, view, state) => async (dispatch) => {
  let groups = state.groups;
  if (state.filtered.length !== 0) {
    groups = state.filtered;
  }

  groups = groups.map((group) => {
    if (group._id === id) {
      return {
        ...group,
        view,
      };
    } else {
      return group;
    }
  });

  if (state.filtered.length !== 0) {
    return dispatch({
      type: GROUPS_FILTER_COURSE,
      payload: groups,
    });
  }

  dispatch({
    type: GROUPS_LOADED,
    payload: groups,
  });
};

// Load a group
export const setGroupCurrent = (id) => async (dispatch) => {
  // Make a request to get the group
  try {
    const res = await api.get(`/groups/${id}`);
    dispatch({
      type: GROUPS_SET_CURRENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUPS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
