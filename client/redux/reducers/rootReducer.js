import { combineReducers } from "redux";
import usersReducer from "./users-reducer";
import ticketsReducer from "./tickets-reducer";
import ordersReducer from "./orders-reducer";

const rootReducer = combineReducers({
  userrr: usersReducer,
  ticketsss: ticketsReducer,
  ordersss: ordersReducer,
});

export default rootReducer;
