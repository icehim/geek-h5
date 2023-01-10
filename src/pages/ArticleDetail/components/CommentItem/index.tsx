import dayjs from 'dayjs'

import Icon from '@/components/icon'

import styles from './index.module.scss'

type Props = {
    // normal 普通 - 文章的评论
    type?: 'normal'
}

const CommentItem = ({
                         // normal 普通
                         type = 'normal',
                     }: Props) => {
    return (
        <div className={styles.root}>
            {/* 评论人头像 */}
            <div className="avatar">
                <img src="http://geek.itheima.net/images/user_head.jpg" alt=""/>
            </div>
            <div className="comment-info">
                <div className="comment-info-header">
                    {/* 评论人 */}
                    <span className="name">黑马先锋</span>
                    {/* 文章评论-点赞 */}
                    <span className="thumbs-up">
            10
            <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'}/>
          </span>
                </div>
                {/* 评论内容 */}
                <div className="comment-content">打破零评论</div>
                <div className="comment-footer">
          <span className="replay">
            0 回复
            <Icon type="iconbtn_right"/>
          </span>
                    <span className="comment-time">{dayjs().from('2021-01-01')}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem
