import {Link, useHistory} from 'react-router-dom'

import Icon from "@/components/icon";
import styles from './index.module.scss'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUserAction} from "@/store/actions/profile";

const Profile = () => {
    const history = useHistory()
    //1.获取登陆人信息存到redux
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch<any>(getUserAction())
    }, [dispatch])

    return (
        <div className={styles.root}>
            <div className="profile">
                {/* 个人信息 */}
                <div className="user-info">
                    <div className="avatar">
                        <img
                            src={'http://toutiao.itheima.net/images/user_head.jpg'}
                            alt=""
                        />
                    </div>
                    <div className="user-name">黑马先锋</div>
                    {/*修改个人信息跳转*/}
                    <Link to="/profile/edit">
                        个人信息 <Icon type="iconbtn_right"/>
                    </Link>
                </div>

                {/* 今日阅读 */}
                <div className="read-info">
                    <Icon type="iconbtn_readingtime"/>
                    今日阅读
                    <span>10</span>
                    分钟
                </div>

                {/* 动态 - 对应的这一行 */}
                <div className="count-list">
                    <div className="count-item">
                        <p>1</p>
                        <p>动态</p>
                    </div>
                    <div className="count-item">
                        <p>9</p>
                        <p>关注</p>
                    </div>
                    <div className="count-item">
                        <p>99</p>
                        <p>粉丝</p>
                    </div>
                    <div className="count-item">
                        <p>200</p>
                        <p>被赞</p>
                    </div>
                </div>

                {/* 消息通知 - 对应的这一行 */}
                <div className="user-links">
                    <div className="link-item">
                        <Icon type="iconbtn_mymessages"/>
                        <div>消息通知</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_mycollect"/>
                        <div>收藏</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_history1"/>
                        <div>浏览历史</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_myworks"/>
                        <div>我的作品</div>
                    </div>
                </div>
            </div>

            {/* 更多服务 */}
            <div className="more-service">
                <h3>更多服务</h3>
                <div className="service-list">
                    <div className="service-item">
                        <Icon type="iconbtn_feedback"/>
                        <div>用户反馈</div>
                    </div>
                    <div className="service-item" onClick={() => history.push('/chat')}>
                        <Icon type="iconbtn_xiaozhitongxue"/>
                        <div>小智同学</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
