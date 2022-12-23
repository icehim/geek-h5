import './App.scss';
import {useRoutes} from "react-router-dom";
import Login from "./pages/login";
import Layout from "./pages/layout";
import Test from "./pages/test";

const routes = [
    {
        path: '/',
        element: <Layout/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/test',
        element: <Test/>
    }
]

function App() {
    const ele = useRoutes(routes)

    return (
        <div className="app">
            {ele}
        </div>
    );
}

export default App;
