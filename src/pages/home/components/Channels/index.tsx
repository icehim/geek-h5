import classnames from 'classnames'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import {useSelector} from "react-redux";
import {RootState} from "@/types/store";
import {useRedux} from "@/hooks";
import {getAllChannelAction} from "@/store/actions/home";

type Props = {
    onClose: () => void
}
const Channels = ({onClose}: Props) => {
    //1.获取我的频道数据
    const {userChannel} = useSelector((state: RootState) => state.home)
    //2.获取可选频道数据
    useRedux(getAllChannelAction, 'home')
    return (
        <div className={styles.root}>
            {/*头部*/}
            <div className="channel-header">
                <Icon onClick={onClose} type="iconbtn_channel_close"/>
            </div>
            {/*内容*/}
            <div className="channel-content">
                {/* 编辑时，添加类名 edit */}
                <div className={classnames('channel-item')}>
                    <div className="channel-item-header">
                        <span className="channel-item-title">我的频道</span>
                        <span className="channel-item-title-extra">点击进入频道</span>
                        <span className="channel-item-edit">编辑</span>
                    </div>
                    {/*1.我的频道列表数据*/}
                    <div className="channel-list">
                        {/* 选中时，添加类名 selected */}

                        {
                            userChannel.map(item => (
                                <span key={item.id} className={classnames('channel-list-item')}>
                                    {item.name}
                                    <Icon type="iconbtn_tag_close"/>
                                </span>
                            ))
                        }
                    </div>
                </div>

                <div className="channel-item">
                    <div className="channel-item-header">
                        <span className="channel-item-title">频道推荐</span>
                        <span className="channel-item-title-extra">点击添加频道</span>
                    </div>
                    {/*2.可选频道列表数据*/}
                    <div className="channel-list">
                        <span className="channel-list-item">+ HTML</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Channels
