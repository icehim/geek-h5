import type {LoginFormData} from "@/types/data.t";
import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";

export const LoginAction = (data: LoginFormData): RootThunkAction => {
    return async (dispatch) => {
        const res = await request.post('/v1_0/authorizations', data)
        dispatch({type: 'login/token', payload: res.data})
    }
}
