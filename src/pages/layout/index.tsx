import {TabBar} from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'

// 导航栏数据
const tabs = [
    {
        key: 'home',
        title: '首页',
        icon: <AppOutline/>,
    },
    {
        key: 'todo',
        title: '待办',
        icon: <UnorderedListOutline/>,
    },
    {
        key: 'message',
        title: '消息',
        // active的值是true表明被选中=》显示被选中的图标 | 值是false=》显示未被选中的图标
        icon: (active: boolean) =>
            active ? <MessageFill/> : <MessageOutline/>,
    },
    {
        key: 'personalCenter',
        title: '我的',
        icon: <UserOutline/>,
    },
]

function Layout() {
    return (
        <div>
            {/*导航栏*/}
            <TabBar style={{width: '100%', position: 'fixed', bottom: 0, borderTop: '1px solid #ddd'}}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                ))}
            </TabBar>
        </div>
    );
}

export default Layout;
