import {NavBar, InfiniteScroll, Popup, Toast} from 'antd-mobile'
import {useHistory, useParams} from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import {useEffect, useRef, useState} from "react";
import {
    addComment,
    fav,
    follow,
    getArticleDetail,
    getComments,
    likeComment,
    unFav,
    unFollow,
    unLikeComment
} from "@/api/article";
import {ArticleCommentItem, ArticleDetail} from "@/types/data";
import {formatTime} from '@/utils'
import check from 'dompurify'
//高亮样式
import 'highlight.js/styles/dark.css'
import ContentLoader from "react-content-loader";
import NoneComment from "@/components/NoneComment";
import CommentInput from "@/pages/ArticleDetail/components/CommentInput";

// 使用枚举类型来指定评论类型：
enum CommentType {
    Comment = 'a',
    Reply = 'c'
}


const Article = () => {
    const history = useHistory()

    //1.获取文章详情数据
    const {artId} = useParams<{ artId: string }>()
    //2.文章详情数据
    const [detail, setDetail] = useState<ArticleDetail>({} as ArticleDetail)

    useEffect(() => {
        const getDetail = async () => {
            const {data} = await getArticleDetail(artId)
            setDetail(data)
            setLoading(false)
        }
        getDetail()
    }, [artId])

    //6.获取文章评论数量
    const [commentList, setCommentList] = useState<ArticleCommentItem[]>([])
    const [hasMore, setHasMore] = useState(true)
    //分页的偏移量
    const offset = useRef<string | null>(null)
    //评论列表加载
    const loadMoreComments = async () => {
        const {
            data: {
                results,
                total_count,
                last_id
            }
        } = await getComments(CommentType.Comment, detail.art_id, offset.current)
        setCommentList([...commentList, ...results])
        if (commentList.length === total_count) {
            setHasMore(false)
        } else {
            // 记录下次请求的起点ID
            offset.current = last_id
        }
    }

    //3.点击评论滚动评论区域
    //可滚动的内容区域的dom
    const wrapperRef = useRef<HTMLDivElement>(null)
    //可滚动目标区域dom
    const commentRef = useRef<HTMLDivElement>(null)

    //定义表示:是否以及滚动到评论位置
    const isShowComment = useRef(false)

    const onCommentShow = () => {
        console.log()
        const wrapper = wrapperRef.current

        const comment = commentRef.current
        if (!wrapper || !comment) return
        // 执行滚动=>评论区距离页面顶部滚动高度=评论区距离页面可视区顶部高度 - 页面头部高度 + 页面滚动高度(默认0)
        if (!isShowComment.current) {
            //1.滚动到评论
            wrapper.scrollTo({
                top: comment.getBoundingClientRect().top + wrapper.scrollTop - 45,
                behavior: "smooth"
            })
            isShowComment.current = true
        } else {
            //2.回到顶部
            wrapper.scrollTo({
                top: 0,
                behavior: "smooth"
            })
            isShowComment.current = false
        }
    }
    //4.关注作者
    const onFollow = async () => {
        if (detail.is_followed) {
            //取关
            await unFollow(detail.aut_id)
            setDetail({...detail, is_followed: false})
        } else {
            //关注
            await follow(detail.aut_id)
            setDetail({...detail, is_followed: true})
        }
    }

    //5.收藏
    const onFav = async () => {
        if (detail.is_collected) {
            //取消收藏
            await unFav(detail.art_id)
            setDetail({...detail, is_collected: false})

        } else {
            //收藏
            await fav(detail.art_id)
            setDetail({...detail, is_collected: true})

        }
    }
    //对评论点赞
    const onLike = async (com_id: string, is_liking: boolean) => {
        /*
        * 1.接口调用
        * 2.本地状态更新
        * */
        if (is_liking) {
            //取消点赞
            await unLikeComment(com_id)
        } else {
            //点赞
            await likeComment(com_id)
        }
        const newList = commentList.map(item => {
            if (item.com_id === com_id) {
                return {
                    ...item,
                    is_liking: !is_liking,
                    like_count: item.like_count + (!is_liking ? 1 : -1)
                }
            }
            return item
        })
        setCommentList(newList)
    }
    //6.发表评论
    //控制弹层显隐状态
    const [commentShow, setCommentShow] = useState(false)
    const openComment = () => setCommentShow(true)
    const closeComment = () => setCommentShow(false)
    //发表评论
    const onAddComment = async (content: string) => {
        console.log('评论内容:', content)
        /*
        * 1.数据库发表评论=》调用接口
        * 2.本地更新评论列表数据
        * */
        const {data} = await addComment({target: detail.art_id, content})
        //本地更新评论列表数据
        commentList.length > 0 && setCommentList([data.new_obj, ...commentList])
        //更新评论数量
        setDetail({...detail, comm_count: detail.comm_count + 1})
        //提示
        Toast.show({
            content: '评论成功'
        })
        closeComment()

    }
    //准备弹层渲染函数
    const renderCommentPopup = () => {
        return (
            <Popup onMaskClick={closeComment} visible={commentShow} position='bottom' bodyStyle={{height: '50vh'}}>
                <CommentInput onClose={closeComment} onAddComment={onAddComment}/>
            </Popup>
        )
    }

    const renderArticle = () => {
        // 文章详情
        return (
            //1.可以滚动的区域
            <div className="wrapper" ref={wrapperRef}>
                <div className="article-wrapper">
                    {/*文章作者信息*/}
                    <div className="header">
                        <h1 className="title">{detail.title}</h1>

                        <div className="info">
                            <span>{formatTime(detail.pubdate)}</span>
                            <span>{detail.read_count} 阅读</span>
                            <span>{detail.comm_count} 评论</span>
                        </div>

                        <div className="author">
                            <img src={detail.aut_photo} alt=""/>
                            <span className="name">{detail.aut_name}</span>
                            <span
                                onClick={onFollow}
                                className={classNames('follow', detail.is_followed ? 'followed' : '')}
                            >
                                {detail.is_followed ? '已关注' : '关注'}
                            </span>
                        </div>
                    </div>
                    {/*文章内容*/}
                    <div className="content">
                        <div
                            className="content-html dg-html"
                            dangerouslySetInnerHTML={{__html: check.sanitize(detail.content)}}/>
                        <div className="date">发布文章时间：{formatTime(detail.pubdate)}</div>
                    </div>
                </div>
                {/*文章评论*/}
                {/*滚动的目标位置*/}
                <div className="comment" ref={commentRef}>
                    {/*相对于父盒子comment定位*/}
                    <div className="comment-header">
                        <span>全部评论（{detail.comm_count}）</span>
                        <span>{detail.like_count} 点赞</span>
                    </div>
                    {
                        detail.comm_count === 0 ? <NoneComment/> :
                            (
                                <div className="comment-list">
                                    {
                                        commentList.map(item => (
                                            <CommentItem
                                                onLike={() => onLike(item.com_id, item.is_liking)}
                                                key={item.com_id} {...item}/>
                                        ))
                                    }
                                    <InfiniteScroll hasMore={hasMore} loadMore={loadMoreComments}/>
                                </div>
                            )
                    }

                </div>
            </div>
        )
    }

    //loading加载
    const [loading, setLoading] = useState(true)
    if (loading) {
        return (
            <ContentLoader
                speed={2}
                width={375}
                height={230}
                viewBox="0 0 375 230"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="16" y="8" rx="3" ry="3" width="340" height="10"/>
                <rect x="16" y="26" rx="0" ry="0" width="70" height="6"/>
                <rect x="96" y="26" rx="0" ry="0" width="50" height="6"/>
                <rect x="156" y="26" rx="0" ry="0" width="50" height="6"/>
                <circle cx="33" cy="69" r="17"/>
                <rect x="60" y="65" rx="0" ry="0" width="45" height="6"/>
                <rect x="304" y="65" rx="0" ry="0" width="52" height="6"/>
                <rect x="16" y="114" rx="0" ry="0" width="340" height="15"/>
                <rect x="263" y="208" rx="0" ry="0" width="94" height="19"/>
                <rect x="16" y="141" rx="0" ry="0" width="340" height="15"/>
                <rect x="16" y="166" rx="0" ry="0" width="340" height="15"/>
            </ContentLoader>
        )
    }
    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                {/*文章详情头部*/}
                <NavBar
                    onBack={() => history.go(-1)}
                    right={<span><Icon type="icongengduo"/></span>
                    }
                >
                    {detail && (
                        <div className="nav-author">
                            <img src={detail.aut_photo} alt=""/>
                            <span className="name">{detail.aut_name}</span>
                            <span
                                onClick={onFollow}
                                className={classNames('follow', detail.is_followed ? 'followed' : '')}
                            >
                            {detail.is_followed ? '已关注' : '关注'}
                            </span>
                        </div>
                    )}
                </NavBar>
                {/* 文章详情和评论 */}
                {renderArticle()}

                {/* 底部评论栏 */}
                <CommentFooter
                    commentCount={detail.comm_count}
                    openComment={openComment}
                    onCommentShow={onCommentShow}
                    onFav={onFav}
                    isFav={detail.is_collected}/>
            </div>
            {/*发表评论弹层*/}
            {renderCommentPopup()}
        </div>
    )
}

export default Article
