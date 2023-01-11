import {Input, NavBar} from 'antd-mobile'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom'
import Icon from '@/components/icon'
import styles from './index.module.scss'

const Chat = () => {
    const history = useHistory()

    return (
        <div className={styles.root}>
            <NavBar className="fixed-header" onBack={() => history.go(-1)}>
                小智同学
            </NavBar>
            {/*小智聊天列表*/}
            <div className="chat-list">
                <div className={classnames('chat-item', true ? 'self' : 'user')}>
                    {true ? (
                        <Icon type="iconbtn_xiaozhitongxue"/>
                    ) : (
                        <img src="http://geek.itheima.net/images/user_head.jpg" alt=""/>
                    )}
                    <div className="message">你好，我是小智</div>
                </div>
            </div>
            {/*聊天发送区域-输入框*/}
            <div className="input-footer">
                <Input className="no-border" placeholder="请描述您的问题"/>
                <Icon type="iconbianji"/>
            </div>
        </div>
    )
}

export default Chat
