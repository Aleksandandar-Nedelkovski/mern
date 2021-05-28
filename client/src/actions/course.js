import api from "../utils/api";
import { setAlert } from "./alert";
import {
  GET_COURSES,
  COURSE_ERROR,
  UPDATE_COURSE,
  ADD_COURSE,
  GET_COURSE,
  DELETE_COURSE,
  ADD_LESSON,
  LESSON_ERROR,
  REMOVE_LESSON,
} from "./types";

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

// Update course
export const updateCourse = (id) => async (dispatch) => {
  try {
    await api.put(`/courses/${id}`);

    dispatch({
      type: UPDATE_COURSE,
      payload: id,
    });

    dispatch(setAlert("Course Updated", "success"));
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

// Update course
export const listPublished = (id) => async (dispatch) => {
  try {
    await api.put(`/courses/${id}`);

    dispatch({
      type: UPDATE_COURSE,
      payload: id,
    });

    dispatch(setAlert("Course Updated", "success"));
  } catch (err) {
    dispatch({
      type: COURSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteLesson = (courseId, lessonId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${courseId}/${lessonId}`);

    dispatch({
      type: REMOVE_LESSON,
      payload: lessonId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
