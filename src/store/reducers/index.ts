import {combineReducers} from "redux";

import {login} from "@/store/reducers/login";
import {profile} from "@/store/reducers/profile";

const rootReducer = combineReducers({login, profile})

export default rootReducer
