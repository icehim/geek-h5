import {RootThunkAction} from "@/types/store";
import request from "@/utils/request";

export const getUserAction = (): RootThunkAction => {
    return async (dispatch,) => {
        const res = await request.get('/v1_0/user')
        console.log(res)
    }
}
