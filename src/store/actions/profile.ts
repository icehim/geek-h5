import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";
import {UserProfile, UserProfileResponse, UserResponse} from "@/types/data";

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

// 修改登录人信息
/**
 *
 * @param user 要更新的用户信息(一部分信息)
 */
export const updateUserAction = (user: Partial<UserProfile>): RootThunkAction => {
    return async (dispatch) => {
        await request.patch('/v1_0/user/profile', user)
        dispatch({type: 'user/update', payload: user})
    }
}
