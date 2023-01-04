import styles from './index.module.scss'
import Icon from "@/components/icon";
import {Popup, Tabs} from "antd-mobile";
import {useRedux} from "@/hooks";
import {getChannelAction} from "@/store/actions/home";
import Channels from './components/Channels'
import {useState} from "react";

const Home = () => {
    const {userChannel} = useRedux(getChannelAction, 'home')
    //1.频道管理
    const [showChannel, setShowChannel] = useState(false)
    const openChannel = () => {
        setShowChannel(true)
    }
    const closeChannel = () => {
        setShowChannel(false)
    }
    return (
        <div className={styles.root}>
            {/* 频道 Tabs 列表 */}

            <Tabs className="tabs" activeLineMode="fixed">
                {
                    userChannel.map(item => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            {`推荐的内容${item.id}`}
                        </Tabs.Tab>
                    ))
                }
            </Tabs>


            <div className="tabs-opration">
                {/*搜索按钮*/}
                <Icon type="iconbtn_search"/>
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
