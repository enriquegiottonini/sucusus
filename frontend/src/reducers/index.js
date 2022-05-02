import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import users from "./admin"

export default combineReducers({
  auth,
  message,
  users,
});
