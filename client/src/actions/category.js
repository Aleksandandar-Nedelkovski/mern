import api from "../utils/api";
import { setAlert } from "./alert";
import { ADD_CATEGORY, CATEGORY_ERROR, GET_CATEGORIES } from "./types";

// Add category
export const addCategory = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/categories/add", formData);

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });

    dispatch(setAlert("Category Created", "success"));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("NOT GREAT", "failure"));
  }
};

// Add category
export const loadCategories = () => async (dispatch) => {
  try {
    const res = await api.get("/categories");

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });

    dispatch(setAlert("Categories Loades", "success"));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("NOT GREAT", "failure"));
  }
};
