import {Channel} from "@/types/data";
import {HomeAction} from "@/types/store";

type Init = {
    userChannel: Channel[]
    restChannel: Channel[]
    active: number
}
const initialState: Init = {
    userChannel: [], //用户频道
    restChannel: [],//频道推荐
    active: 0//选中频道的ID
}

export const home = (state = initialState, action: HomeAction): Init => {
    //用户频道
    if (action.type === 'home/getUserChannel') {
        return {
            ...state,
            userChannel: action.payload
        }
    }
    //获取可选频道
    if (action.type === 'home/getRestChannel') {
        return {
            ...state,
            restChannel: action.payload
        }
    }
    //高亮
    if (action.type === 'home/toggleChannel') {
        return {
            ...state,
            active: action.payload
        }
    }
    return state
}
