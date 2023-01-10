import {useEffect, useRef, useState} from 'react'
import {NavBar, TextArea} from 'antd-mobile'
import styles from './index.module.scss'
import {TextAreaRef} from 'antd-mobile/es/components/text-area'

// 该组件的两个使用场景：1 文章评论  2 评论回复

type Props = {
    // 对评论回复时，需要传入该属性
    name?: string
    onClose?: () => void
}

const CommentInput = ({name, onClose}: Props) => {
    const [value, setValue] = useState('')
    const textAreaRef = useRef<TextAreaRef>(null)

    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])

    const onChange = (value: string) => {
        setValue(value)
    }

    return (
        <div className={styles.root}>
            <NavBar onBack={onClose} right={<span className="publish">发表</span>}>
                {name ? '回复评论' : '评论文章'}
            </NavBar>

            <div className="input-area">
                {name && <div className="at">@{name}:</div>}
                <TextArea
                    ref={textAreaRef}
                    placeholder="说点什么~"
                    rows={6}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default CommentInput
