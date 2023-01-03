import {Input, NavBar, TextArea} from 'antd-mobile'

import styles from './index.module.scss'
import {useEffect, useState} from "react";

type Props = {
    type: '' | 'name' | 'intro'
    onClose: () => void
    updateUser: (type: string, data: string, close: () => void) => void
    value: string
}

const EditInput = ({onClose, value, updateUser, type}: Props) => {
    // value被当作默认值传进来，只会在第一次生效
    const [inputValue, setInputValue] = useState(value)
    // 提交修改
    const updateName = () => {
        updateUser(type, inputValue, onClose)
    }
    // 区分修改的状态
    const isName = type === 'name'
    // 监控value值的变化
    useEffect(() => {
        setInputValue(value || '')
    }, [value])

    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                onBack={onClose}
                right={<span onClick={updateName} className="commit-btn">提交</span>}
            >
                编辑{isName ? '昵称' : '简介'}
            </NavBar>

            <div className="edit-input-content">
                <h3>{isName ? '昵称' : '简介'}</h3>

                {
                    isName ? (
                        <div className="input-wrap">
                            <Input
                                value={inputValue}
                                onChange={setInputValue}
                                placeholder="请输入"/>
                        </div>
                    ) : (
                        <TextArea
                            className="textarea"
                            placeholder="请输入"
                            // 展示：右下角的字数统计
                            showCount
                            // 指定内容最大长度
                            maxLength={100}
                            // 指定 文本域 展示内容的行数（文本域高度）
                            rows={4}
                            value={inputValue}
                            onChange={setInputValue}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default EditInput
