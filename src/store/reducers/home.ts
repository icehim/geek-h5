import {Channel} from "@/types/data";
import {HomeAction} from "@/types/store";

type Init = {
    userChannel: Channel[]
}
const initialState: Init = {
    userChannel: []
}

export const home = (state = initialState, action: HomeAction): Init => {
    if (action.type === 'home/getUserChannel') {
        return {
            ...state,
            userChannel: action.payload
        }
    }
    return state
}
