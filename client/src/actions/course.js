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
  ADD_ENROLLMENT,
  ENROLLMENT_ERROR,
  GET_ENROLLMENT,
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

// Add lesson
export const addLesson = (courseId, formData, history) => async (dispatch) => {
  try {
    const res = await api.post(`/courses/lesson/${courseId}`, formData);

    dispatch({
      type: ADD_LESSON,
      payload: res.data,
    });

    dispatch(setAlert("Lesson Created", "success"));
    history.push(`/courses/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("NO NO Lesson", "danger"));
  }
};

// Delete lesson
export const deleteLesson = (courseId, lessonId) => async (dispatch) => {
  try {
    await api.delete(`/courses/lesson/${courseId}/${lessonId}`);
    dispatch({
      type: REMOVE_LESSON,
      payload: lessonId,
    });

    dispatch(setAlert("Lesson Removed", "success"));
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
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

// Add enrollment
export const addEnrollment = (courseId, formData, history) => async (
  dispatch
) => {
  try {
    const res = await api.post(`/courses/enrollment/${courseId}`, formData);

    dispatch({
      type: ADD_ENROLLMENT,
      payload: res.data,
    });

    dispatch(setAlert("Enrollment Added", "success"));
    history.push(`/learn/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: ENROLLMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// enrollmentStats
export const enrollmentStats = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/courses/enrollment/${courseId}`);

    dispatch({
      type: ADD_ENROLLMENT,
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
export const listEnrolled = (courseId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/courses/enrollment/${courseId}`, formData);

    dispatch({
      type: ADD_ENROLLMENT,
      payload: res.data,
    });

    dispatch(setAlert("Enrollment Added", "success"));
  } catch (err) {
    dispatch({
      type: ENROLLMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// getEnrollment
export const getEnrollment = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/courses/enrollment/${courseId}`);

    dispatch({
      type: GET_ENROLLMENT,
      payload: res.data,
    });

    dispatch(setAlert("GET_ENROLLMENT", "success"));
  } catch (err) {
    dispatch({
      type: ENROLLMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
