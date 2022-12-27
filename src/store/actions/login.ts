import type {LoginFormData, LoginResponse} from "@/types/data";
import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";
import {setToken} from "@/utils/auth";


export const LoginAction = (data: LoginFormData): RootThunkAction => {
    return async (dispatch) => {
        const res: LoginResponse = await request.post('/v1_0/authorizations', data)
        /*
        * 持久化token:
        * 1.本地存一份
        * 2.redux寸一份
        * */
        setToken(res.data)
        dispatch({type: 'login/token', payload: res.data})
    }
}
