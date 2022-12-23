import axios from "axios";
import store from "@/store";
// import {logoutAction} from "@/store/actions/login";
import {Toast} from "antd-mobile";
import {customHistory} from "@/utils/history";
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
}, (error) => {
    if (error.response.status === 401) {
        /*
        * 1.清除redux中存储的状态数据
        * 2.跳回登录页，携带当前页面的地址(目的:下次登录，可以跳回上次访问的页面)
        * */
        Toast.show({
            content: error.response.data.message || '出错了',
            icon: "fail",
            afterClose: () => {
                // store.dispatch(logoutAction())
                //  怎么获取路由跳转的history对象？=>通过history模块
                //customHistory.location.pathname获取当前访问的页面
                // customHistory.replace({
                //     pathname: '/login',
                //
                // })
            }
        })
    }
    return Promise.reject(error)
})

export default request
