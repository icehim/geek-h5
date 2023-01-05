import styles from './index.module.scss'
import Icon from "@/components/icon";
import {Popup, Tabs} from "antd-mobile";
import {useRedux} from "@/hooks";
import {getChannelAction} from "@/store/actions/home";
import Channels from './components/Channels'
import {useState} from "react";
import {useDispatch} from "react-redux";
import ArticleList from "@/pages/home/components/ArticleList";
import {useHistory} from "react-router";

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {userChannel, active} = useRedux(getChannelAction, 'home')
    //1.频道管理
    const [showChannel, setShowChannel] = useState(false)
    const openChannel = () => {
        setShowChannel(true)
    }
    const closeChannel = () => {
        setShowChannel(false)
    }
    const changeActive = (id: string) => {
        dispatch({type: 'home/toggleChannel', payload: parseInt(id)})
    }
    return (
        <div className={styles.root}>
            {/* 频道 Tabs 列表 */}
            {/*注意：此处别忘了添加tabs类名*/}
            <Tabs activeKey={active + ''} onChange={changeActive} className="tabs" activeLineMode="fixed">
                {
                    userChannel.map(item => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            {/*每个频道的文章列表*/}
                            <ArticleList channelId={item.id}/>
                        </Tabs.Tab>
                    ))
                }
            </Tabs>

            <div className="tabs-opration">
                {/*搜索按钮*/}
                <Icon onClick={() => history.push('/search')} type="iconbtn_search"/>
                {/*频道编辑按钮*/}
                <Icon onClick={openChannel} type="iconbtn_channel"/>
            </div>
            {/*频道管理*/}
            <Popup className='channel-popup' visible={showChannel} position='left'>
                <Channels onClose={closeChannel}/>
            </Popup>
        </div>
    )
}

export default Home
