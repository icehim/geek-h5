import styles from './index.module.scss'

type Props = {
    type: '' | 'gender' | 'photo'
    onClose: () => void
    onUpdate: (type: string, data: number | string, close: () => void) => void
}
const genderList = [
    {text: '男', value: 0},
    {text: '女', value: 1}
]

const photoList = [
    {text: '拍照', value: ''},
    {text: '本地选择', value: ''}
]

const EditList = ({onClose, onUpdate, type}: Props) => {
    //判断是修改性别还是头像
    const list = type === 'gender' ? genderList : photoList
    return (
        <div className={styles.root}>
            {
                list.map(item => (
                    <div key={item.text} onClick={() => onUpdate(type, item.value, onClose)}
                         className="list-item">{item.text}</div>
                ))
            }
            <div onClick={onClose} className="list-item">取消</div>
        </div>
    )
}

export default EditList
