import styles from './index.module.scss'

type Props = {
    type: '' | 'gender' | 'photo'
    onClose: () => void
    onUpdate: (type: string, data: number, close: () => void) => void
}
const EditList = ({onClose, onUpdate, type}: Props) => {
    return (
        <div className={styles.root}>
            <div onClick={() => onUpdate(type, 0, onClose)} className="list-item">男</div>
            <div onClick={() => onUpdate(type, 1, onClose)} className="list-item">女</div>

            <div onClick={onClose} className="list-item">取消</div>
        </div>
    )
}

export default EditList
