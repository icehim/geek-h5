import {RootThunkAction} from "@/types/store";
import {UserChannelResponse} from "@/types/data";
import request from "@/utils/request";

//获取用户频道数据
export const getChannelAction = (): RootThunkAction => {
    return async (dispatchEvent) => {
        const {data}: UserChannelResponse = await request.get('/v1_0/user/channels')
        console.log(data)
    }
}
