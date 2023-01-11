import {TabBar} from 'antd-mobile'
import Icon from '@/components/icon'
import styles from './index.module.scss'
import {Route, useHistory, useLocation} from "react-router-dom";
//导入子路由页面
import Home from "@/pages/home";
import Question from "@/pages/question";
import Video from "@/pages/video";
import Profile from "@/pages/profile";
import {AuthRoute} from "@/components/auth";
import KeepAlive from "@/components/keep-alive";
// 导航栏数据
const tabs = [
    //path 高亮的标识
    {path: '/home', icon: 'iconbtn_home', text: '首页'},
    // 缓存home

    {path: '/home/question', icon: 'iconbtn_qa', text: '问答'},
    {path: '/home/video', icon: 'iconbtn_video', text: '视频'},
    {path: '/home/profile', icon: 'iconbtn_mine', text: '我的'}
]

function Layout() {
    //1.导航栏路由切换
    const history = useHistory()
    const changeRoute = (path: string) => {
        history.push(path)
    }
    //2.刷新保存高亮状态
    const location = useLocation()

    return (
        <div className={styles.root}>
            {/*子路由显示位置*/}
            {/*<Route exact path='/home' component={Home}/>*/}
            <KeepAlive exact path="/home">
                <Home/>
            </KeepAlive>
            <Route path='/home/question' component={Question}/>
            <Route path='/home/video' component={Video}/>
            {/*<Route path='/home/profile' component={Profile}/>*/}
            <AuthRoute path="/profile/edit">
                <Profile/>
            </AuthRoute>

            {/*导航栏*/}
            <TabBar

                activeKey={location.pathname}
                onChange={changeRoute}
                className='tab-bar'>
                {tabs.map(item => (
                    <TabBar.Item
                        key={item.path}
                        //icon选中的图标名字带个:_sel
                        icon={active => (<Icon type={active ? `${item.icon}_sel` : item.icon}/>)}
                        title={item.text}/>
                ))}
            </TabBar>
        </div>
    );
}

export default Layout;
