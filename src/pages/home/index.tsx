import styles from './index.module.scss'
import Icon from "@/components/icon";
import {Tabs} from "antd-mobile";
import {useRedux} from "@/hooks";
import {getChannelAction} from "@/store/actions/home";

const Home = () => {
    const {userChannel} = useRedux(getChannelAction, 'home')
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
                <Icon type="iconbtn_search"/>
                <Icon type="iconbtn_channel"/>
            </div>
        </div>
    )
}

export default Home
