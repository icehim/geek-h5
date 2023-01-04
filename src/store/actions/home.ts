import {RootThunkAction} from "@/types/store";
import {UserChannelResponse} from "@/types/data";
import request from "@/utils/request";
import _ from 'lodash'

//获取用户频道数据
export const getChannelAction = (): RootThunkAction => {
    return async (dispatch) => {
        const {data: {channels}}: UserChannelResponse = await request.get('/v1_0/user/channels')
        dispatch({type: 'home/getUserChannel', payload: channels})
    }
}
//获取所有频道=》减去我的=》频道推荐
export const getAllChannelAction = (): RootThunkAction => {
    return async (dispatch, getState) => {
        const {data: {channels}}: UserChannelResponse = await request.get('/v1_0/channels')
        //减去我的=》频道推荐
        const {userChannel} = getState().home
        const restChannels = _.differenceBy(channels, userChannel, 'id')
        dispatch({type: 'home/getRestChannel', payload: restChannels})
    }
}
