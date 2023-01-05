import classnames from 'classnames'
import {useHistory} from 'react-router'
import {NavBar, SearchBar} from 'antd-mobile'

import Icon from '@/components/icon'
import styles from './index.module.scss'
import {useState} from "react";
import {getSuggestsListApi} from "@/api/search";
// import {debounce} from "lodash";
import {useDebounceFn} from "ahooks";

//1.使用lodash进行联想词防抖
// debounceFN是经过防抖处理的可执行函数
// const debounceFN = debounce(async (value: string) => {
//     const {data: {options}} = await getSuggestsListApi(value)
//     console.log(options)
// }, 600)

const SearchPage = () => {
    const history = useHistory()
    //1.搜索输入受控=》获取用户输入
    //搜索关键词
    const [keyWord, setKeyWord] = useState('')
    //联想词列表
    const [suggests, setSuggests] = useState<string[]>([])

    //2.使用useDebounceFn处理防抖
    const {run} = useDebounceFn(async (value: string) => {
        const {data: {options}} = await getSuggestsListApi(value)
        //处理联想词高亮=》用户输入的value=》<span>value</span>使用replace
        setSuggests(options.map(item => item.replace(value, `<span>${value}</span>`)))

    }, {wait: 600})
    const changeWord = async (value: string) => {
        setKeyWord(value)
        //2.获取联想词数据
        //注意:判断是否为空，空不处理
        if (!value.trim()) return setSuggests([])
        // debounceFN(value) //使用lodash
        run(value)//使用 ahooks
    }
    //3.跳转搜索结果页，携带搜索关键词
    const onSearch = (value: string) => {
        history.push(`/search/result?q=${value}`)
    }
    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                onBack={() => history.go(-1)}
                right={<span onClick={() => onSearch(keyWord)} className="search-text">搜索</span>}
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
            <div className={classnames('search-result', suggests.length > 0 && 'show')}>

                {
                    suggests.map(item => (
                        item && (
                            <div
                                key={item}
                                className="result-item"
                                onClick={() => onSearch(item.replace(`<span>${keyWord}</span>`, keyWord))}>
                                <Icon className="icon-search" type="iconbtn_search"/>
                                <div dangerouslySetInnerHTML={{__html: item}} className="result-value text-overflow">
                                    {/*<span>黑马</span>*/}
                                    {/*{item}*/}

                                </div>
                            </div>)
                    ))
                }
            </div>
        </div>
    )
}

export default SearchPage
