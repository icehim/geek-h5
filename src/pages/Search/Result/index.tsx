import {useHistory} from 'react-router-dom'
import {NavBar} from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import {useEffect, useState} from "react";
import {getSearchList} from "@/api/search";
import {ArticlesItem} from "@/types/data";

const Result = () => {
    const history = useHistory()
    //结果列表
    const [list, setList] = useState<ArticlesItem[]>([])

    useEffect(() => {
        const sea = new URLSearchParams(window.location.search)
        console.log(sea.get('q'))
        const getResult = async () => {
            const {data: {results}} = await getSearchList({page: 1, q: sea.get('q') || ''})
            setList(results)
        }
        getResult()
    }, [])
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
            <div className="article-list">{renderArticleList()}</div>
        </div>
    )
}

export default Result
