import {Channel} from "@/types/data";
import {HomeAction} from "@/types/store";

type Init = {
    userChannel: Channel[]
    restChannel: Channel[]
}
const initialState: Init = {
    userChannel: [], //用户频道
    restChannel: []//频道推荐
}

export const home = (state = initialState, action: HomeAction): Init => {
    if (action.type === 'home/getUserChannel') {
        return {
            ...state,
            userChannel: action.payload
        }
    }
    if (action.type === 'home/getRestChannel') {
        return {
            ...state,
            restChannel: action.payload
        }
    }
    return state
}
