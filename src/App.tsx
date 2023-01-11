import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Test from "@/pages/test";
import UserEdit from "@/pages/profile/edit";
import {AuthRoute} from "@/components/auth";
import ProfileEdit from "@/pages/profile/edit";
import Detail from "@/pages/ArticleDetail";
import Search from "@/pages/Search";
import Result from "@/pages/Search/Result";
import Chat from "@/pages/profile/Chat";

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    {/*默认首页重定向*/}
                    <Redirect exact from='/' to='/home'></Redirect>
                    <AuthRoute path="/profile/edit">
                        <ProfileEdit/>
                    </AuthRoute>
                    {/* 文章详情 */}
                    <Route path="/article/:artId" component={Detail}/>
                    <Route exact path="/search" component={Search}/>
                    <Route path="/search/result" component={Result}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/home" component={Layout}/>
                    <Route path="/test" component={Test}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile/edit" component={UserEdit}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
