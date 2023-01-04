// AuthRoute 组件的使用，与 路由自己的 Route 组件用法相同
// 也就是说：Route 能够接受什么属性，AuthRoute 组件也能够接受什么属性
// <Route path="" component={Home} />

import {isAuth} from '@/utils/auth'
import {Route, Redirect, RouteProps, useLocation} from 'react-router-dom'
import React from "react";

/*
  <Route path="">
    <Home />
  </Route>

  注意：此处的 children 就是 <Home />，也就是一个渲染好的组件了
  所以，此处，直接返回 children 即可。因为已经渲染过了内容，所以，此处不需要再通过标签来渲染了
*/
export const AuthRoute = ({children, ...rest}: RouteProps) => {
    const location = useLocation()
    return (
        <Route
            {...rest}
            render={() => {
                const isLogin = isAuth()
                if (isLogin) {
                    // 登录
                    return children as React.ReactNode
                    // return <Home />
                }
                // 未登录
                return (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: location.pathname,
                            },
                        }}
                    />
                )
            }}
        />
    )
}
