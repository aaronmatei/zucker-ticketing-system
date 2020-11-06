import { combineReducers } from "redux"
import usersReducer from "./users-reducer"

const rootReducer = combineReducers({
    userrr: usersReducer
})

export default rootReducer

