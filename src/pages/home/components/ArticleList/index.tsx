import {InfiniteScroll} from 'antd-mobile'
import {useRef, useState} from 'react'
import ArticleItem from '@/components/ArticleItem'
import styles from './index.module.scss'
import {getArticleListApi} from "@/api/home";
import {ArticlesItem} from "@/types/data";
import {useHistory} from "react-router-dom";

type Props = {
    channelId: number
}
const ArticleList = ({channelId}: Props) => {
    //1.定义列表的数据
    const [data, setData] = useState<ArticlesItem[]>([])
    //2.控制列表加载状态:hasMore 是否有更多数据=》true 表示有更多数据
    const [hasMore, setHasMore] = useState(true)
    //3.loadMore 加载更多数据
    //存储时间戳
    const timestamp = useRef(Date.now())

    async function loadMore() {
        const {data: {results, pre_timestamp}} = await getArticleListApi({
            channel_id: channelId,
            //第一次传当前时间=》 第二次传递上一次接口返回的pre_timestamp
            //说明:如果当前接口返回的pre_timestamp===null 说明数据加载完成了
            timestamp: timestamp.current
        })
        //1.从后台获取数据之后=》追加
        setData(val => [...val, ...results])
        // //2.判断控制列表数据是否加载完成
        // setHasMore(append.length > 0)
        if (pre_timestamp) {
            timestamp.current = pre_timestamp
        } else {
            //设置成false=>没有数据
            setHasMore(false)
        }
    }

    // 跳转详情
    const history = useHistory()

    return (
        <div className={styles.root}>
            {/* 文章列表中的每一项 */}
            {data.map((item, index) => (
                <div
                    key={item.art_id}
                    className="article-item"
                    onClick={() => history.push(`/article/${item.art_id}`)}
                >
                    <ArticleItem type={item.cover.type} item={item}/>
                </div>
            ))}
            {/*
                loadMore 加载数据的函数
                hasMore 布尔值，true 表示还有更多数据；false 表示没有更多数据了
            */}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
        </div>
    )
}
export default ArticleList
