// moment 插件  dayjs 插件  都是处理时间格式
import dayjs from 'dayjs'
// 使用dayjs插件（按需）
import relativeTime from 'dayjs/plugin/relativeTime'
// 国际化
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
// 添加插件
dayjs.extend(relativeTime)

// 相对时间换算
/**
 *
 * @param {*} value 获取模版中值：val | filter
 */
export const relTime = (value: string) => {
    // console.log(dayjs())
    return dayjs().from(value)
}

/**
 *
 * @param time 时间
 * @param format 格式
 * @returns
 */
export function formatTime(time: string, format = 'YYYY年MM月DD日') {
    return dayjs(time).format(format)
}
