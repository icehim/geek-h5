import Icon from '@/components/icon'

import styles from './index.module.scss'
import {ArticleCommentItem} from "@/types/data";
import {formatTime} from "@/utils";

type Props = ArticleCommentItem & {
    // normal 普通 - 文章的评论
    //origin 回去评论的原始评论，也就是对哪个评论进行回复
    //reply 回复评论
    type?: 'normal' | 'reply' | 'origin'
}

const CommentItem = (
    {
        type = 'normal',
        aut_photo,
        aut_name,
        like_count,
        is_followed,
        is_liking,
        content,
        reply_count,
        pubdate,
    }: Props) => {
    return (
        <div className={styles.root}>
            {/* 评论人头像 */}
            <div className="avatar">
                <img src={aut_photo} alt=""/>
            </div>
            <div className="comment-info">
                <div className="comment-info-header">
                    {/* 评论人 */}
                    <span className="name">{aut_name}</span>
                    {/* 文章评论-点赞 */}
                    <span className="thumbs-up">
            {like_count}
                        <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'}/>
          </span>
                </div>
                {/* 评论内容 */}
                <div className="comment-content">{content}</div>
                <div className="comment-footer">
          <span className="replay">
            {reply_count} 回复
            <Icon type="iconbtn_right"/>
          </span>
                    <span className="comment-time">{formatTime(pubdate)}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem
