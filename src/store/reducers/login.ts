import {Token} from "@/types/data.t";

const initialState: Token = {
    token: '',
    refresh_token: ''
}

export const login = (state = initialState, action: unknown) => {
    return state
}
