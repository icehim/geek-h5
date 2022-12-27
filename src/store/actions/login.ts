import type {LoginFormData, LoginResponse} from "@/types/data";
import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";


export const LoginAction = (data: LoginFormData): RootThunkAction => {
    return async (dispatch) => {
        const res: LoginResponse = await request.post('/v1_0/authorizations', data)
        dispatch({type: 'login/token', payload: res.data})
    }
}
