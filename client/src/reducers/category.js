import {
  GET_CATEGORIES,
  CATEGORY_ERROR,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  GET_CATEGORY,
} from "../actions/types";

const initialState = {
  no: 1,
  categoryName: "",
  loading: true,
  error: {},
};

function categoryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        CATEGORIES: payload,
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        CATEGORY: payload,
        loading: false,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        CATEGORIES: [payload, ...state.CATEGORIES],
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        CATEGORIES: state.CATEGORIES.filter(
          (CATEGORY) => CATEGORY._id !== payload
        ),
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}

export default categoryReducer;
