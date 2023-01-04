import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'

const ArticleList = () => {
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        <ArticleItem type={1} />
      </div>
    </div>
  )
}

export default ArticleList
