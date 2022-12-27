import type {LoginFormData, LoginResponse} from "@/types/data";
import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";
import {setToken} from "@/utils/auth";

/**
 *
 * @param data 表单数据
 * @constructor
 */
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


/**
 * 发送验证码
 * @param mobile 手机号
 * @constructor
 */
export const GetCodeAction = (mobile: string): RootThunkAction => {
    return async () => {
        await request.get(`/v1_0/sms/codes/${mobile}`)
    }
}
