import api from "../utils/api";
import { setAlert } from "./alert";
import {
  ADD_COURSE,
  COURSE_ERROR,
  LIST_PUBLISHED_COURSES,
  LIST_PUBLISHED_COURSES_ERROR,
} from "./types";

// Add post
export const addCourse = (formData, userId) => async (dispatch) => {
  try {
    const res = await api.post("/courses/by/" + userId, formData);

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

// listPublished
export const listPublishedCourses = () => async (dispatch) => {
  try {
    const res = await api.get("/courses/published");

    dispatch({
      type: LIST_PUBLISHED_COURSES,
      payload: res.data,
    });

    dispatch(setAlert("LIST_PUBLISHED_COURSES", "success"));
    // history.push(`/course/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: LIST_PUBLISHED_COURSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("LIST_PUBLISHED_COURSES_ERROR", "danger"));
  }
};
