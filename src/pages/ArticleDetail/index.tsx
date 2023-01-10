import {NavBar, InfiniteScroll} from 'antd-mobile'
import {useHistory, useParams} from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import {useEffect, useState} from "react";
import {getArticleDetail} from "@/api/article";
import {ArticleDetail} from "@/types/data";
import {formatTime} from '@/utils'
import check from 'dompurify'
//高亮样式
import 'highlight.js/styles/dark.css'
import ContentLoader from "react-content-loader";

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
        }
        getDetail()
    }, [artId])

    //评论列表加载
    const loadMoreComments = async () => {
        console.log('加载更多评论')
    }

    const renderArticle = () => {
        // 文章详情
        return (
            <div className="wrapper">
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
                <div className="comment">
                    <div className="comment-header">
                        <span>全部评论（{detail.comm_count}）</span>
                        <span>{detail.like_count} 点赞</span>
                    </div>

                    <div className="comment-list">
                        <CommentItem/>

                        <InfiniteScroll hasMore={false} loadMore={loadMoreComments}/>
                    </div>
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
                <CommentFooter/>
            </div>
        </div>
    )
}

export default Article
