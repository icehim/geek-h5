import classnames from 'classnames'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/types/store";
import {useRedux} from "@/hooks";
import {delUserChannelAction, getAllChannelAction} from "@/store/actions/home";
import {useState} from "react";
import {Channel} from "@/types/data";
import {Toast} from "antd-mobile";

type Props = {
    onClose: () => void
}
const Channels = ({onClose}: Props) => {
    const dispatch = useDispatch()
    //1.获取我的频道数据
    const {userChannel, active} = useSelector((state: RootState) => state.home)
    //2.获取可选频道数据
    const {restChannel} = useRedux(getAllChannelAction, 'home')
    //3.编辑状态切换
    const [isEdit, setIsEdit] = useState(false)
    const changeEdit = () => {
        setIsEdit(!isEdit)
    }
    //4.点击频道高亮(复用)
    const changeActive = (currChannel: Channel) => {
        if (!isEdit) {
            // 不是编辑状态
            dispatch({type: 'home/toggleChannel', payload: currChannel.id})
            onClose()
            return
        }
        //编辑状态=》执行删除操作
        if (currChannel.id === 0 || currChannel.id === active || userChannel.length <= 4) {
            return Toast.show({content: '不满足删除条件'})
        }
        dispatch<any>(delUserChannelAction(currChannel))
    }
    return (
        <div className={styles.root}>
            {/*头部*/}
            <div className="channel-header">
                <Icon onClick={onClose} type="iconbtn_channel_close"/>
            </div>
            {/*内容*/}
            <div className="channel-content">
                {/* 编辑时，添加类名 edit */}
                <div className={classnames('channel-item', isEdit && 'edit')}>
                    <div className="channel-item-header">
                        <span className="channel-item-title">我的频道</span>
                        <span className="channel-item-title-extra">点击进入频道</span>
                        <span onClick={changeEdit} className="channel-item-edit">{isEdit ? '保存' : '编辑'}</span>
                    </div>
                    {/*1.我的频道列表数据*/}
                    <div className="channel-list">
                        {/* 选中时，添加类名 selected */}
                        {
                            userChannel.map(item => (
                                <span
                                    onClick={() => changeActive(item)}
                                    key={item.id}
                                    className={classnames('channel-list-item', active === item.id && 'selected')}>
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
                        {
                            restChannel.map(item => (
                                <span key={item.id} className="channel-list-item">+ {item.name}</span>

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Channels
