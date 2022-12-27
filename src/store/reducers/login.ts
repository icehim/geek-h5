import {Token} from "@/types/data";
import {LoginAction} from "@/types/store";
import {getToken} from "@/utils/auth";

const initialState: Token = getToken()

export const login = (state = initialState, action: LoginAction) => {
    if (action.type === 'login/token') {
        return action.payload
    }
    return state
}
