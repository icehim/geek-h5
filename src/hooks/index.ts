import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {RootState} from "@/types/store";

/**
 * 全局公用hooks函数
 * */
const useRedux = <StateName extends keyof RootState>(action: any, stateName: StateName) => {
    //1.获取数据存到redux
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action())
    }, [dispatch, action])
    //2.获取redux数据
    // RootState =>login | profile
    const state = useSelector((state: RootState) => state[stateName])
    //3.返回数据
    return state
}


export {useRedux}
