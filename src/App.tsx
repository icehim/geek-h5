import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Test from "@/pages/test";
import {AuthRoute} from "@/components/auth";
import ProfileEdit from "@/pages/profile/edit";
import Detail from "@/pages/ArticleDetail";
import Search from "@/pages/Search";
import Result from "@/pages/Search/Result";
import Chat from "@/pages/profile/Chat";
import KeepAlive from "@/components/keep-alive";

function App() {
    return (
        <Router>
            <div className="app">
                {/*测试Route组件children属性
                    1.任何时候都会执行
                    2.返回渲染的组件会被缓存
                    问题:任何时候都显示，通过props.match决定是否显示
                    */}
                {/*<Route path='/keep' children={(props) => {*/}
                {/*    return (*/}
                {/*        <div style={{height: '100%', display: props.match ? 'block' : 'none'}}>*/}
                {/*            <Keep/>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*}}/>*/}
                {/*<Route path='/keep2' component={Keep}/>*/}

                {/*放到switch中缓存会失效*/}
                <KeepAlive path="/home" component={Layout}>
                    {/*<Layout/>*/}
                </KeepAlive>
                <Switch>
                    {/*默认首页重定向*/}
                    <Redirect exact from='/' to='/home'></Redirect>
                    {/*缓存layout*/}
                    <Route path="/login" component={Login}/>
                    <Route path="/test" component={Test}/>
                    <Route path="/article/:artId" component={Detail}/>
                    <Route exact path="/search" component={Search}/>
                    <Route path="/search/result" component={Result}/>
                    <Route path="/chat" component={Chat}/>
                    {/* 文章详情 */}
                    {/*<Route path="/profile/edit" component={UserEdit}/>*/}
                    <AuthRoute path="/profile/edit">
                        <ProfileEdit/>
                    </AuthRoute>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
