import classnames from 'classnames'

import Icon from '@/components/icon'

import styles from './index.module.scss'
import {ArticlesItem} from '@/types/data'
import {relTime} from "@/utils";
import {Image} from "antd-mobile";

type Props = {
    /**
     * 0 表示无图
     * 1 表示单图
     * 3 表示三图
     */
    type: 0 | 1 | 3
    item: ArticlesItem
}

const ArticleItem = ({type, item}: Props) => {
    return (
        <div className={styles.root}>
            <div
                className={classnames(
                    'article-content',
                    type === 3 && 't3',
                    type === 0 && 'none-mt'
                )}>
                <h3>{item.title}</h3>
                {type !== 0 && (
                    <div className="article-imgs">
                        {item.cover.images.map((img, i) => (
                            <div key={i} className="article-img-wrapper">
                                {/*<img src={img} alt=""/>*/}
                                <Image src={img} lazy style={{'--width': '110px', '--height': '69px'}}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={classnames('article-info', type === 0 && 'none-mt')}>
                <span>{item.aut_name}</span>
                <span>{item.comm_count} 评论</span>
                <span>{relTime(item.pubdate)}</span>
                <span className="close">
            <Icon type="iconbtn_essay_close"/>
        </span>
            </div>
        </div>
    )
}

export default ArticleItem
