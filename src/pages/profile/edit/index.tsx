import {Button, List, DatePicker, NavBar, Popup, Toast} from 'antd-mobile'
import classNames from 'classnames'

import styles from './index.module.scss'
import {getUserEditAction, updateUserAction} from "@/store/actions/profile";
import {useRedux} from "@/hooks";
//修改昵称子组件
import EditInput from "@/pages/profile/edit/components/EditInput";
import {useState} from "react";
import {useDispatch} from "react-redux";
// 修改性别
import EditList from "@/pages/profile/edit/components/EditList";

const Item = List.Item

type InputProps = {
    type: '' | 'name' | 'intro'
    value: string
    show: boolean
}
type ListProps = {
    type: '' | 'gender' | 'photo' // 区分当前是修改性别还是头像
    show: boolean // 控制弹层显隐
}

const ProfileEdit = () => {
    //1.获取修改数据
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch<any>((getUserEditAction()))
    // }, [dispatch])
    //
    // //2.回填数据
    // const {edit} = useSelector((state: RootState) => state.profile)
    const {edit} = useRedux(getUserEditAction, 'profile')
    const {photo, name, gender, birthday, intro,} = edit

    //2.修改昵称 | 简介
    // const [inputVisible, setInputVisible] = useState(false)
    const [inputVisible, setInputVisible] = useState<InputProps>({
        type: '',//区分是修改昵称还是简介 'name' | 'intro'
        value: '',//更新的值
        show: false//控制弹层显示还是隐藏
    })
    //打开修改昵称弹窗
    const openInput = () => {
        setInputVisible({
            type: 'name',
            value: name,
            show: true
        })
    }

    //关闭弹窗
    const closeInput = () => {
        // setInputVisible(false)
        setInputVisible({
            type: '',
            value: '',
            show: false
        })
    }

    //打开修改简介
    const openIntro = () => {
        setInputVisible({
            type: 'intro',
            value: intro || '',
            show: true
        })
    }

    //3.接受子组件修改用户信息=》进行更新(调用接口和更新redux状态)
    const updateUser = (type: string, data: string | number, close: () => void) => {
        /*
        *   1.发送请求更新数据库和更新redux数据
        *   2.关闭弹出层
        * */
        dispatch<any>(updateUserAction({[type]: data}))
        Toast.show({
            content: '更新成功'
        })
        //关闭对应的弹层
        close()
    }

    //4.修改性别或头像
    const [listProps, setListProps] = useState<ListProps>({
        type: '',
        show: false
    })

    const openGender = () => {
        setListProps({
            type: 'gender',
            show: true
        })
    }
    const closeList = () => {
        setListProps({
            type: '',
            show: false
        })
    }


    return (
        <div className={styles.root}>
            <div className="content">
                {/* 标题 */}
                <NavBar
                    style={{
                        '--border-bottom': '1px solid #F0F0F0'
                    }}
                >
                    个人信息
                </NavBar>

                <div className="wrapper">
                    {/* 列表 */}
                    <List className="profile-list">
                        {/* 列表项 */}
                        <Item
                            extra={
                                <span className="avatar-wrapper">
                                    <img width={24} height={24} src={photo} alt=""/>
                                </span>
                            }
                            arrow
                        >
                            头像
                        </Item>
                        <Item onClick={openInput} arrow extra={name}>
                            昵称
                        </Item>
                        <Item
                            arrow
                            extra={
                                <span onClick={openIntro} className={classNames('intro', 'normal')}>
                                    {intro || '未填写'}
                                </span>
                            }
                        >
                            简介
                        </Item>
                    </List>

                    <List className="profile-list">
                        <Item onClick={openGender} arrow extra={gender === 0 ? '男' : '女'}>
                            性别
                        </Item>
                        <Item arrow extra={birthday}>
                            生日
                        </Item>
                    </List>

                    <DatePicker
                        visible={false}
                        value={new Date()}
                        title="选择年月日"
                        min={new Date(1900, 0, 1, 0, 0, 0)}
                        max={new Date()}
                    />
                </div>

                <div className="logout">
                    <Button className="btn">退出登录</Button>
                </div>
            </div>
            {/*修改昵称弹出层*/}
            <Popup visible={inputVisible.show} position='right'>
                <EditInput
                    type={inputVisible.type}
                    value={inputVisible.value}
                    onClose={closeInput}
                    updateUser={updateUser}/>
            </Popup>
            {/*修改昵称或头像*/}
            <Popup visible={listProps.show} onMaskClick={closeList} position='bottom'>
                <EditList type={listProps.type} onClose={closeList} onUpdate={updateUser}/>
            </Popup>
        </div>
    )
}

export default ProfileEdit
