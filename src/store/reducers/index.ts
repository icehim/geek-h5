import {combineReducers} from "redux";

import {login} from "@/store/reducers/login";
import {profile} from "@/store/reducers/profile";
import {home} from "@/store/reducers/home";

const rootReducer = combineReducers({login, profile, home})

export default rootReducer
