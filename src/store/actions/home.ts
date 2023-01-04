import {RootThunkAction} from "@/types/store";
import {UserChannelResponse} from "@/types/data";
import request from "@/utils/request";

//获取用户频道数据
export const getChannelAction = (): RootThunkAction => {
    return async (dispatch) => {
        const {data: {channels}}: UserChannelResponse = await request.get('/v1_0/user/channels')
        dispatch({type: 'home/getUserChannel', payload: channels})
    }
}
