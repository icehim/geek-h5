import {Input, NavBar} from 'antd-mobile'

import styles from './index.module.scss'
import {useState} from "react";

type Props = {
    onClose: () => void
    updateUser: (data: string) => void
    value: string
}

const EditInput = ({onClose, value, updateUser}: Props) => {
    const [inputValue, setInputValue] = useState(value)
    // 提交修改
    const updateName = () => {
        updateUser(inputValue)
    }
    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                onBack={onClose}
                right={<span onClick={updateName} className="commit-btn">提交</span>}
            >
                编辑昵称
            </NavBar>

            <div className="edit-input-content">
                <h3>昵称</h3>

                <div className="input-wrap">
                    <Input
                        value={inputValue}
                        onChange={setInputValue}
                        placeholder="请输入"/>
                </div>
            </div>
        </div>
    )
}

export default EditInput
