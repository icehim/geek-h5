import {useHistory} from 'react-router-dom'
import {InfiniteScroll, NavBar} from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import {useEffect, useRef, useState} from "react";
import {getSearchList} from "@/api/search";
import {ArticlesItem} from "@/types/data";

const Result = () => {
    const history = useHistory()
    // 获取搜索的query参数
    const query = new URLSearchParams(window.location.search)
    const q = query.get('q') || ''

    //结果列表
    const [list, setList] = useState<ArticlesItem[]>([])

    useEffect(() => {
        const sea = new URLSearchParams(window.location.search)
        const getResult = async () => {
            const {data: {results}} = await getSearchList({page: 1, q: sea.get('q') || ''})
            setList(results)
        }
        getResult()
    }, [])

    const [hasMore, setHasMore] = useState(true)
    const page = useRef(1)

    async function loadMore() {
        const {
            data: {results, total_count},
        } = await getSearchList({q, page: page.current})
        setList([...list, ...results])
        if (total_count === list.length) {
            setHasMore(false)
        } else {
            page.current++
        }
    }

    //渲染结果列表
    const renderArticleList = () => {
        return list.map((item) => {
            return (
                <div
                    key={item.art_id}
                    className="article-item"
                    onClick={() => history.push(`/article/${item.art_id}`)}>
                    <ArticleItem type={item.cover.type} item={item}/>
                </div>
            )
        })
    }

    return (
        <div className={styles.root}>
            <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
            <div className="article-list">{renderArticleList()}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
            </div>
        </div>
    )
}

export default Result
