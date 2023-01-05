import classnames from 'classnames'
import {useHistory} from 'react-router'
import {NavBar, SearchBar} from 'antd-mobile'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import {useState} from "react";

const SearchPage = () => {
    const history = useHistory()
    //1.搜索输入受控=》获取用户输入
    const [keyWord, setKeyWord] = useState('')
    const changeWord = (value: string) => {
        setKeyWord(value)
    }
    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                onBack={() => history.go(-1)}
                right={<span className="search-text">搜索</span>}
            >
                <SearchBar value={keyWord} onChange={changeWord} placeholder="请输入关键字搜索"/>
            </NavBar>

            {true && (
                <div
                    className="history"
                    style={{
                        display: true ? 'none' : 'block'
                    }}
                >
                    <div className="history-header">
                        <span>搜索历史</span>
                        <span>
              <Icon type="iconbtn_del"/>
              清除全部
            </span>
                    </div>

                    <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close"/>
            </span>
                    </div>
                </div>
            )}
            {/*搜索联想词*/}
            <div className={classnames('search-result', true ? 'show' : '')}>
                <div className="result-item">
                    <Icon className="icon-search" type="iconbtn_search"/>
                    <div className="result-value text-overflow">
                        <span>黑马</span>
                        程序员
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
