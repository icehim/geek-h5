import {NavBar, InfiniteScroll} from 'antd-mobile'
import {useHistory, useParams} from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import {useEffect} from "react";
import {getArticleDetail} from "@/api/article";

const Article = () => {
    const history = useHistory()

    //1.获取文章详情数据
    const {artId} = useParams<{ artId: string }>()
    useEffect(() => {
        const getDetail = async () => {
            const {data} = await getArticleDetail(artId)
            console.log(data)
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
                        <h1 className="title">ES6 Promise 和 Async/await的使用</h1>

                        <div className="info">
                            <span>2019-03-11</span>
                            <span>202 阅读</span>
                            <span>10 评论</span>
                        </div>

                        <div className="author">
                            <img src="http://geek.itheima.net/images/user_head.jpg" alt=""/>
                            <span className="name">黑马先锋</span>
                            <span className={classNames('follow', true ? 'followed' : '')}>
                {true ? '已关注' : '关注'}
              </span>
                        </div>
                    </div>
                    {/*文章内容*/}
                    <div className="content">
                        <div className="content-html dg-html"/>
                        <div className="date">发布文章时间：2021-2-1</div>
                    </div>
                </div>
                {/*文章评论*/}
                <div className="comment">
                    <div className="comment-header">
                        <span>全部评论（10）</span>
                        <span>20 点赞</span>
                    </div>

                    <div className="comment-list">
                        <CommentItem/>

                        <InfiniteScroll hasMore={false} loadMore={loadMoreComments}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                {/*文章详情头部*/}
                <NavBar
                    onBack={() => history.go(-1)}
                    right={
                        <span>
              <Icon type="icongengduo"/>
            </span>
                    }
                >
                    {true && (
                        <div className="nav-author">
                            <img src="http://geek.itheima.net/images/user_head.jpg" alt=""/>
                            <span className="name">黑马先锋</span>
                            <span className={classNames('follow', true ? 'followed' : '')}>
                {true ? '已关注' : '关注'}
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
