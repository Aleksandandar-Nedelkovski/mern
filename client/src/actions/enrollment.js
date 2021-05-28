import api from "../utils/api";
import { setAlert } from "./alert";
import {
  CREATE_ENROLLMENT,
  ENROLLMENT_ERROR,
  GET_ENROLLMENT,
  ENROLLMENT_STATS,
  STATS_ENROLLMENT_ERROR,
  LIST_ENROLLED,
  LIST_ENROLLED_ERROR,
  ENROLLMENT_COMPLETE,
  ENROLLMENT_COMPLETE_ERROR,
} from "./types";

// Add enrollment
export const createEnrollment = (courseId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/enrollment/new/${courseId}`, formData);

    dispatch({
      type: CREATE_ENROLLMENT,
      payload: res.data,
    });
    dispatch(setAlert("CREATE_ENROLLMENT", "success"));
  } catch (err) {
    dispatch({
      type: ENROLLMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get enrollment
export const getEnrollment = (enrollmentId) => async (dispatch) => {
  try {
    const res = await api.get(`/enrollment/${enrollmentId}`);
    dispatch({
      type: GET_ENROLLMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ENROLLMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// listEnrolled
export const listEnrolled = () => async (dispatch) => {
  try {
    const res = await api.get(`/enrollment}`);

    dispatch({
      type: LIST_ENROLLED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIST_ENROLLED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// complete
export const complete = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/enrollment/complete${id}`);

    dispatch({
      type: ENROLLMENT_COMPLETE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ENROLLMENT_COMPLETE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const enrollmentStats = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/enrollment/stats${id}`);

    dispatch({
      type: ENROLLMENT_STATS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: STATS_ENROLLMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
