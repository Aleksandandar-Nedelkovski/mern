import api from "../utils/api";
import { setAlert } from "./alert";
import {
  GET_EVENTS,
  ADD_EVENT,
  GET_EVENT,
  EVENT_ERROR,
  GET_EVENTS_FAIL,
  UPDATE_EVENT,
} from "./types";

// Get all events
export const getEvents = () => async (dispatch) => {
  try {
    const res = await api.get("/events");
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EVENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get one event by ID
export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/events/${id}`);
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Create an event
export const createEvent = (formData, history) => async (dispatch) => {
  try {
    const res = await api.post("/events", formData);

    dispatch({
      type: ADD_EVENT,
      payload: res.data,
    });

    dispatch(setAlert("Event Created", "success"));
    history.push(`/event/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update an event
export const updateEvent = (eventId, formData, history) => async (dispatch) => {
  try {
    const res = await api.post(`/events/${eventId}`, formData);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    });
    history.push(`/event/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete an event
export const deleteEvent = (id, history) => async (dispatch) => {
  try {
    await api.delete(`/events/${id}`);
    history.push(`/dashboard`);
  } catch (err) {
    console.log(err.message);
  }
};

// Add a comment
export const addComment = (eventId, text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await api.post(`/events/${eventId}/comment`, text, config);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((error) => dispatch(setAlert(error)));
    }
  }
};

// Delete a comment
export const deleteComment = (eventId, commentId) => async (dispatch) => {
  try {
    const res = await api.delete(`/events/${eventId}/comment/${commentId}`);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Subscribe to an event
export const subscribeEvent = (eventId) => async (dispatch) => {
  try {
    const res = await api.post(`/events/${eventId}/subscribe`);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

// Unsubscribe to an event
export const unsubscribeEvent = (eventId) => async (dispatch) => {
  try {
    const res = await api.post(`/events/${eventId}/unsubscribe`);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};
