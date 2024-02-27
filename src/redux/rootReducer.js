import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import petReducer from "./pet/petReducer";
const rootReducer = combineReducers({
    user:userReducer,
    pet:petReducer
})

export default rootReducer