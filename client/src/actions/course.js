import api from "../utils/api";
import { setAlert } from "./alert";
import {
  ADD_COURSE,
  GET_COURSE,
  GET_COURSES,
  COURSE_ERROR,
  DELETE_COURSE,
  ADD_LESSON,
  LESSON_ERROR,
} from "./types";

// Add course
export const addCourse = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/courses", formData);

    dispatch({
      type: ADD_COURSE,
      payload: res.data,
    });

    dispatch(setAlert("Course Created", "success"));
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("NO NO", "danger"));
  }
};

// Get course
export const getCourse = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/courses/${id}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get courses
export const getCourses = () => async (dispatch) => {
  try {
    const res = await api.get("/courses");
    dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.delete(`/courses/${id}`);

    dispatch({
      type: DELETE_COURSE,
      payload: id,
    });

    dispatch(setAlert("COURSE Removed", "success"));
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add course
export const addLesson = (formData, id) => async (dispatch) => {
  try {
    const res = await api.post(`/courses/${id}/lesson/new`, formData);

    dispatch({
      type: ADD_LESSON,
      payload: res.data,
    });

    dispatch(setAlert("Lesson Created", "success"));
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("NO NO Lesson", "danger"));
  }
};
