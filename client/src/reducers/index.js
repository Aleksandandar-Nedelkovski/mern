import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import group from "./group";
import events from "./eventsReducer";
import peer from "./peer";
import category from "./category";
import course from "./course";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  group,
  peer,
  events,
  category,
  course,
});
