import {UserAction} from "@/types/store";
import {User} from "@/types/data";

type InitialState = {
    user: User
}

const initialState = {
    user: {}
} as InitialState
export const profile = (state = initialState, action: UserAction): InitialState => {
    if (action.type === 'user/get') {
        return {
            ...state,
            user: action.payload
        }
    }
    return state
}
