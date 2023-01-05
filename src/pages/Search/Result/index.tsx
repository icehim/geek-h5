import {useHistory} from 'react-router-dom'
import {NavBar} from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'

const Result = () => {
    const history = useHistory()

    const renderArticleList = () => {
        return [].map((item, index) => {
            return (
                <div
                    key={index}
                    className="article-item"
                    onClick={() => history.push(`/article/${1}`)}>
                    <ArticleItem type={1} item={item}/>
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
