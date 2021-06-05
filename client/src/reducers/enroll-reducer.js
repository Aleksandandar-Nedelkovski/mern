import {
  ADD_ENROLLMENT,
  GET_ENROLLMENT,
  GET_ENROLLMENTS,
} from "../actions/types";

const initialState = {
  enrollments: [],
  enrollment: null,
  course: "",
  loading: true,
  error: {},
};

function enrollmentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ENROLLMENTS:
      return {
        ...state,
        enrollments: payload,
        loading: false,
      };
    case GET_ENROLLMENT:
      return {
        ...state,
        enrollment: payload,
        loading: false,
      };
    case ADD_ENROLLMENT:
      return {
        ...state,
        enrollments: [payload, ...state.enrollments],
        loading: false,
      };
    default:
      return state;
  }
}

export default enrollmentReducer;
