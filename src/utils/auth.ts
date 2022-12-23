/*
* 封装存储token相关方法:
* 1.存token
* 2.获取token
* 3.删除token
* 4.根据token判断是否登录
* */

//持久化token:{token:string;refresh_token:string}
import {Token} from "@/types/data.t";

const TOKEN_KEY: string = 'geek-h5-token'

//获取token
const getToken = () => {
    //注意:一定要返回获取到的token
    return JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}') as Token
}

//存储token
const setToken = (token: Token): void => {
    (localStorage.setItem(TOKEN_KEY, JSON.stringify(token)))
}

//清除token
const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

//是否已登录
//判断是否登录:false未登录 true登录
//!!使用场景:判断一个值是否是=》'' null undefined
const isAuth = () => {
    return !!getToken().token
}

export {getToken, isAuth, setToken, clearToken}
