import { combineReducers } from "redux";
import usersReducer from "./users-reducer";
import ticketsReducer from "./tickets-reducer";

const rootReducer = combineReducers({
  userrr: usersReducer,
  ticketsss: ticketsReducer,
});

export default rootReducer;
