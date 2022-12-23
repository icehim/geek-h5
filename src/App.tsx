import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import Test from "@/pages/test";

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    {/*默认首页重定向*/}
                    <Redirect exact from='/' to='/home'></Redirect>
                    <Route path="/home" component={Layout}/>
                    <Route path="/test" component={Test}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
