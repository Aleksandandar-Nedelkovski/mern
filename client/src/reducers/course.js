import {
  GET_COURSES,
  COURSE_ERROR,
  ADD_COURSE,
  GET_COURSE,
  GET_DEFAULT_PHOTO,
} from "../actions/types";

const initialState = {
  courses: [],
  course: null,
  loading: true,
  error: {},
};

function courseReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: payload,
        loading: false,
      };
    case GET_DEFAULT_PHOTO:
      return {
        ...state,
        course: payload,
        loading: false,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [payload, ...state.courses],
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default courseReducer;
