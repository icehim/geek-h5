import {UserAction} from "@/types/store";
import {User, UserProfile} from "@/types/data";

type InitialState = {
    user: User
    edit: UserProfile
}

const initialState = {
    user: {},
    edit: {}
} as InitialState

export const profile = (state = initialState, action: UserAction): InitialState => {
    if (action.type === 'user/get') {
        return {
            ...state,
            user: action.payload
        }
    }
    if (action.type === 'user/edit') {
        return {
            ...state,
            edit: action.payload
        }
    }
    return state
}
