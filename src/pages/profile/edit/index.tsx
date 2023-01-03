import {Button, List, DatePicker, NavBar, Popup} from 'antd-mobile'
import classNames from 'classnames'

import styles from './index.module.scss'
import {getUserEditAction} from "@/store/actions/profile";
import {useRedux} from "@/hooks";
//修改昵称子组件
import EditInput from "@/pages/profile/edit/components/EditInput";
import {useState} from "react";

const Item = List.Item

const ProfileEdit = () => {
    //1.获取修改数据
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch<any>((getUserEditAction()))
    // }, [dispatch])
    //
    // //2.回填数据
    // const {edit} = useSelector((state: RootState) => state.profile)
    const {edit} = useRedux(getUserEditAction, 'profile')
    const {photo, name, gender, birthday, intro,} = edit

    //2.修改昵称
    const [inputVisible, setInputVisible] = useState(false)
    //打开
    const openInput = () => {
        setInputVisible(true)
    }

    //关闭
    const closeInput = () => {
        setInputVisible(false)
    }

    //3.接受子组件修改用户信息=》进行更新(调用接口和更新redux状态)
    const updateUser = (data: string) => {
        console.log(data)
        /*
        *   1.发送请求更新数据库和更新redux数据
        *   2.关闭弹出层
        * */
        closeInput()

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
                                <span className={classNames('intro', 'normal')}>
                  {intro || '未填写'}
                </span>
                            }
                        >
                            简介
                        </Item>
                    </List>

                    <List className="profile-list">
                        <Item arrow extra={gender === 0 ? '男' : '女'}>
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
            <Popup visible={inputVisible} position='right'>
                <EditInput value={name} onClose={closeInput} updateUser={updateUser}/>
            </Popup>
        </div>
    )
}

export default ProfileEdit
