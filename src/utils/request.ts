import store from "@/store";
// import {logoutAction} from "@/store/actions/login";
import {Toast} from "antd-mobile";
import {clearToken, isAuth, setToken} from "@/utils/auth";
import {customHistory} from "@/utils/history";
import axios from "axios";
//创建新axios实例
const request = axios.create({
    //后台请求基础地址
    // baseURL: 'http://geek.itheima.net'
    baseURL: process.env.REACT_APP_URL
})
//请求拦截器
request.interceptors.request.use((config) => {
    //获取token
    const {login: {token}} = store.getState()
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`
    }
    return config
})

//响应拦截器
//对后台数据的返回做简化
request.interceptors.response.use((res) => {
    //直接返回data给页面
    return res.data
}, async (error) => {
    if (error.response.status === 401) {
        /*
        * 401直接跳回登录页=》重新登录
        * 1.清除redux中存储的状态数据
        * 2.跳回登录页，携带当前页面的地址(目的:下次登录，可以跳回上次访问的页面)
        * */
        // Toast.show({
        //     content: error.response.data.message || '出错了',
        //     icon: "fail",
        //     afterClose: () => {
        //         // store.dispatch(logoutAction())
        //         //  怎么获取路由跳转的history对象？=>通过history模块
        //         //customHistory.location.pathname获取当前访问的页面
        //         // customHistory.replace({
        //         //     pathname: '/login',
        //         //
        //         // })
        //     }
        // })

        //无感刷新token流程:=》不用重新登录
        /*
        * 1. 401情况，使用 try-catch 处理异常，捕获异常时，清除本地 token和清空 redux token，提示消息并跳转到登录页面，最后抛出错误
        * 2. 判断是否登录：
        *   1. 没有登录：直接抛出异常，无需刷新
        *   2. **登录过：**使用 `refresh_token` 通过默认的 **axios 发送请求**，**换取新的 token**(关键)
        * 3. 将新获取到的 token 存储到本地缓存中和 redux 中
        * 4. 使用封装的axios**继续发送原来的请求**(关键)
        * */
        try {
            //没有登录
            if (!isAuth()) {
                throw new Error(error)
            }
            //登陆过
            const {refresh_token} = store.getState().login
            const {data} = await axios.put(
                'http://toutiao.itheima.net/v1_0/authorizations',
                null,
                {headers: {Authorization: `Bearer ${refresh_token}`}}
            )
            //将新获取到的 token 存储到本地缓存中和 redux 中
            const newTokens = {
                token: data.data.token,
                refresh_token
            }
            setToken(newTokens)
            store.dispatch({type: 'login/token', payload: newTokens})
            //继续上次401的请求
            return request(error.config)
        } catch (error) {
            //没有登录或刷新token失败会走到这里=》重新登录
            store.dispatch({type: 'login/logout'})
            clearToken()
            Toast.show({
                content: '登录超时,请重新登录',
                icon: "fail",
                afterClose: () => {
                    // store.dispatch(logoutAction())
                    //  怎么获取路由跳转的history对象？=>通过history模块
                    //customHistory.location.pathname获取当前访问的页面
                    customHistory.replace({
                        pathname: '/login',
                        state: {from: customHistory.location.pathname}
                    })
                }
            })
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})

export default request
