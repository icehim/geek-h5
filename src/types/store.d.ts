import {ThunkAction} from "redux-thunk";
import store from "@/store";
import {Token} from "@/types/data";
// 1.store数据类型
export type RootState = ReturnType<typeof store.getState>
// 2.所有action的类型
type RootAction = LoginAction
// 3.异步action函数返回值类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// 4.其他模块的action类型
export type LoginAction = {
    type: 'login/token',
    payload: Token
}
