import Icon from '@/components/icon'
import styles from './index.module.scss'

type Props = {
    // normal 普通评论
    // reply 回复评论
    type?: 'normal' | 'reply'
    //执行滚动的评论位置
    onCommentShow: () => void
    //收藏文章
    // onFav: () => void
    //是否收藏
    isFav: Boolean
    //打开评论弹层
    openComment: () => void
    commentCount: number
    onLike?: () => void
    attitude?: number
    onCollected: () => void
}

const CommentFooter = (
    {
        type = 'normal',
        onCommentShow,
        // onFav,
        isFav,
        openComment,
        commentCount,
        onLike,
        attitude,
        onCollected
    }: Props) => {
    return (
        <div className={styles.root}>
            <div className="input-btn" onClick={openComment}>
                <Icon type="iconbianji"/>
                <span>抢沙发</span>
            </div>

            {type === 'normal' && (
                <>
                    <div className="action-item" onClick={onCommentShow}>
                        <Icon type="iconbtn_comment"/>
                        <p>评论</p>
                        {!!1 && <span className="bage">{commentCount}</span>}
                    </div>
                    <div className="action-item" onClick={onLike}>
                        <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}/>
                        <p>点赞</p>
                    </div>
                    <div className="action-item" onClick={onCollected}>
                        <Icon type={isFav ? 'iconbtn_collect_sel' : 'iconbtn_collect'}/>
                        <p>收藏</p>
                    </div>
                </>
            )}

            {type === 'reply' && (
                <div className="action-item" onClick={onLike}>
                    <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}/>
                    <p>点赞</p>
                </div>
            )}

            <div className="action-item">
                <Icon type="iconbtn_share"/>
                <p>分享</p>
            </div>
        </div>
    )
}

export default CommentFooter
