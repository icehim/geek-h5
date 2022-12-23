import {ThunkAction} from "redux-thunk";
import store from "@/store";
// 1.store数据类型
export type RootState = ReturnType<typeof store.getState>
// 2.所有action的类型
type RootAction = unknown
// 3.异步action函数返回值类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// 4.其他模块的action类型
