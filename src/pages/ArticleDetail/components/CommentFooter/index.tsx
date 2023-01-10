import Icon from '@/components/icon'
import styles from './index.module.scss'

type Props = {
    // normal 普通评论
    // reply 回复评论
    type?: 'normal' | 'reply'
    //执行滚动的评论位置
    onCommentShow: () => void
    //收藏文章
    onFav: () => void
    //是否收藏
    isFav: Boolean
}

const CommentFooter = ({type = 'normal', onCommentShow, onFav, isFav}: Props) => {
    return (
        <div className={styles.root}>
            <div className="input-btn">
                <Icon type="iconbianji"/>
                <span>抢沙发</span>
            </div>

            {type === 'normal' && (
                <>
                    <div className="action-item" onClick={onCommentShow}>
                        <Icon type="iconbtn_comment"/>
                        <p>评论</p>
                        {!!1 && <span className="bage">{1}</span>}
                    </div>
                    <div className="action-item">
                        <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'}/>
                        <p>点赞</p>
                    </div>
                    <div className="action-item" onClick={onFav}>
                        <Icon type={isFav ? 'iconbtn_collect_sel' : 'iconbtn_collect'}/>
                        <p>收藏</p>
                    </div>
                </>
            )}

            {type === 'reply' && (
                <div className="action-item">
                    <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'}/>
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
