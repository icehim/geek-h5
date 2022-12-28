import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";
import {UserResponse} from "@/types/data";

export const getUserAction = (): RootThunkAction => {
    return async (dispatch,) => {
        const res: UserResponse = await request.get('/v1_0/user')
        dispatch({type: 'user/get', payload: res.data})
    }
}
