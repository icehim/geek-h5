import {Token} from "@/types/data";
import {LoginAction} from "@/types/store";

const initialState: Token = {
    token: '',
    refresh_token: ''
}

export const login = (state = initialState, action: LoginAction) => {
    if (action.type === 'login/token') {
        return action.payload
    }
    return state
}
