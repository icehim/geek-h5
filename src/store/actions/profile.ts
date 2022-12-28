import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";
import {UserProfileResponse, UserResponse} from "@/types/data";

// 获取登录人
export const getUserAction = (): RootThunkAction => {
    return async (dispatch,) => {
        const res: UserResponse = await request.get('/v1_0/user')
        dispatch({type: 'user/get', payload: res.data})
    }
}

//获取登录人修改数据
export const getUserEditAction = (): RootThunkAction => {
    return async (dispatch,) => {
        const res: UserProfileResponse = await request.get('/v1_0/user/profile')
        dispatch({type: 'user/edit', payload: res.data})
    }
}
