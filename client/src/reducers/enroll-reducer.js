import {
  GET_COURSES,
  GET_COURSE,
  ADD_ENROLLMENT,
  COURSE_ERROR,
  GET_DEFAULT_PHOTO,
} from "../actions/types";

const initialState = {
  course: "",
  student: null,
  lessonStatus: [],
  enrolled: false,
  error: {},
};

function enrollmentReducer(state = initialState, action) {
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
    case ADD_ENROLLMENT:
      return {
        ...state,
        enrollments: [payload, ...state.enrollments],
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

export default enrollmentReducer;
