import {TabBar} from 'antd-mobile'
import Icon from '@/components/icon'
import styles from './index.module.scss'

// 导航栏数据
const tabs = [
    {path: '/home/index', icon: 'iconbtn_home', text: '首页'},
    {path: '/home/question', icon: 'iconbtn_qa', text: '问答'},
    {path: '/home/video', icon: 'iconbtn_video', text: '视频'},
    {path: '/home/profile', icon: 'iconbtn_mine', text: '我的'}
]

function Layout() {
    return (
        <div className={styles.root}>
            {/*导航栏*/}
            <TabBar className='tab-bar'>
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
